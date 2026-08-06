/**
 * 측정값 → 화면에 낼 결과.
 *
 * 컴포넌트가 아니라 여기 두는 이유는 앞의 것들과 같다 — 검사가 부를 수 있어야
 * 한다. "25도 기울인 얼굴을 넣으면 수평 항목이 가장 낮게 나오는가"는 결과를
 * 조립하는 이 자리에서만 확인할 수 있다.
 *
 * 문장은 안 적는다. VOCAB의 낱말과 숫자로 만든다 — 열 도구 × 열 언어에
 * 결과 문장을 통째로 적으면 팔백 줄이고, 그중 하나가 측정값과 어긋나도
 * 아무도 못 잡는다.
 */
import { VOCAB, bandOf, type Vocab } from './copy.ts';
import { TOOL_TEXT, type MetricKey, type NewSnapSlug } from './tool-text.ts';
import {
  headPose, eyeOpenness, realSmile, idPhoto, framing,
  lighting, sharpness, whiteBalance, shootDistance, mirrorFace,
  type Face, type PixelStats,
} from './measures.ts';
import type { SnapLang } from '@/components/snap/SnapShell';

export interface Metric {
  key: MetricKey;
  label: string;
  /** 0~100 — 막대 길이 */
  percent: number;
  /** 실측값을 사람이 읽을 꼴로. 없으면 안 보인다. */
  raw?: string;
}

export interface SnapResult {
  /** 0~100 */
  percent: number;
  /** 다섯 단계 낱말 */
  band: string;
  /** 한 줄 요약 — 낱말과 숫자로 만든다 */
  headline: string;
  metrics: Metric[];
  /** 가장 낮은 항목의 이름 — "여기를 고치면 된다" */
  weakest: string;
  /**
   * 좌우 합성 얼굴에만 있다 — 화면이 이 축으로 사진을 뒤집어 붙인다.
   * 점수가 아니라 그림이 결과인 유일한 도구다.
   */
  mirror?: { axis: number; box: { x: number; y: number; width: number; height: number } };
}

const pct = (x: number) => Math.round(Math.max(0, Math.min(1, x)) * 100);
const deg = (x: number) => `${x >= 0 ? '+' : ''}${x.toFixed(1)}°`;

function assemble(lang: SnapLang, score: number, metrics: Metric[], headline: string): SnapResult {
  const v = VOCAB[lang];
  const weak = metrics.reduce((a, b) => (b.percent < a.percent ? b : a));
  return { percent: pct(score), band: v.bands[bandOf(score)], headline, metrics, weakest: weak.label };
}

/** 방향 낱말은 도구 셋이 함께 쓴다 */
const dirWord = (v: Vocab, d: 'left' | 'right' | 'above' | 'below' | 'even') => v.dir[d];

/** 픽셀을 봐야 하는 도구 — 화면이 캔버스에서 통계를 뽑아 함께 넘긴다 */
export const NEEDS_PIXELS: ReadonlySet<string> = new Set(['lighting', 'sharpness', 'white-balance']);

export function analyzeSnap(lang: SnapLang, slug: NewSnapSlug, f: Face, px?: PixelStats): SnapResult {
  const v = VOCAB[lang];
  const M = TOOL_TEXT[lang].metric;
  const m = (key: MetricKey, percent: number, raw?: string): Metric => ({ key, label: M[key], percent, raw });

  switch (slug) {
    case 'id-photo': {
      const r = idPhoto(f);
      const byKey = Object.fromEntries(r.checks.map(c => [c.key, c]));
      const metrics = [
        m('faceSize', pct(byKey.faceSize.score), `${pct(byKey.faceSize.value)}%`),
        m('centered', pct(byKey.centered.score), `${pct(byKey.centered.value)}%`),
        m('eyeLine', pct(byKey.eyeLine.score), `${pct(byKey.eyeLine.value)}%`),
        m('level', pct(byKey.level.score), deg(byKey.level.value)),
        m('eyesOpen', pct(byKey.eyesOpen.score)),
      ];
      return assemble(lang, r.score, metrics, `${v.overall} ${pct(r.score)}% · ${v.bands[bandOf(r.score)]}`);
    }
    case 'head-pose': {
      const p = headPose(f);
      /* 각 축은 0에서 멀수록 나쁘다 — 막대는 "정면에 가까운 정도"로 그린다 */
      const level = 1 - Math.min(1, Math.abs(p.roll) / 20);
      const metrics = [
        m('roll', pct(level), deg(p.roll)),
        m('yaw', pct(1 - Math.abs(p.yaw)), p.yaw === 0 ? undefined : dirWord(v, p.yaw > 0 ? 'right' : 'left')),
        m('pitch', pct(1 - Math.abs(p.pitch)), p.pitch === 0 ? undefined : dirWord(v, p.pitch > 0 ? 'above' : 'below')),
      ];
      const score = metrics.reduce((s, x) => s + x.percent, 0) / metrics.length / 100;
      return assemble(lang, score, metrics, `${M.roll} ${deg(p.roll)}`);
    }
    case 'real-smile': {
      const r = realSmile(f);
      const metrics = [m('mouth', pct(r.mouth)), m('eyeSmile', pct(r.eyes))];
      return assemble(lang, r.score, metrics, `${v.overall} ${pct(r.score)}% · ${v.bands[bandOf(r.score)]}`);
    }
    case 'eye-open': {
      const e = eyeOpenness(f);
      /* EAR 자체를 막대로 쓰면 0.3이 30%로 보여 오해를 준다 — 점수로 편다 */
      const one = (x: number) => pct(Math.min(1, Math.max(0, (x - 0.13) / 0.19)));
      const metrics = [
        m('leftEye', one(e.left), e.left.toFixed(2)),
        m('rightEye', one(e.right), e.right.toFixed(2)),
        m('evenness', pct(e.evenness)),
      ];
      return assemble(lang, e.score, metrics, `${v.overall} ${pct(e.score)}% · ${v.bands[bandOf(e.score)]}`);
    }
    case 'lighting': {
      const r = lighting(px!);
      const metrics = [
        m('sideLight', pct(1 - r.sideDiff)),
        m('topLight', pct(1 - r.topDiff)),
        m('backlit', pct(1 - r.backlit)),
        m('exposure', pct(r.exposure), `${Math.round(px!.faceLuma)}/255`),
      ];
      return assemble(lang, r.score, metrics, `${dirWord(v, r.from)}`);
    }
    case 'sharpness': {
      const r = sharpness(px!);
      const metrics = [m('focus', pct(r.score), r.variance.toFixed(0))];
      return assemble(lang, r.score, metrics, `${v.overall} ${pct(r.score)}% · ${v.bands[bandOf(r.score)]}`);
    }
    case 'white-balance': {
      const r = whiteBalance(px!);
      const metrics = [
        m('temp', pct(1 - Math.abs(r.temp)), r.temp.toFixed(2)),
        m('tint', pct(1 - Math.abs(r.tint)), r.tint.toFixed(2)),
      ];
      return assemble(lang, r.score, metrics, v.cast[r.cast]);
    }
    case 'distance': {
      const r = shootDistance(f);
      /* 거리 자체는 좋고 나쁨이 없다 — 막대는 "왜곡이 적은 정도"로 그린다 */
      const metrics = [
        m('shotDistance', pct(1 - r.distortion), `${Math.round(r.cm)}cm`),
        m('faceFill', pct(Math.min(1, r.fill * 2)), `${pct(r.fill)}%`),
        m('perspective', pct(1 - r.distortion)),
      ];
      return assemble(lang, 1 - r.distortion, metrics, `${M.shotDistance} ${Math.round(r.cm)}cm`);
    }
    case 'mirror': {
      const r = mirrorFace(f);
      const metrics = [m('axisBalance', pct(r.balance))];
      const out = assemble(lang, r.balance, metrics, `${v.overall} ${pct(r.balance)}%`);
      return { ...out, mirror: { axis: r.axis, box: f.box } };
    }
    case 'framing': {
      const r = framing(f);
      const metrics = [
        m('headroom', pct(1 - Math.min(1, Math.abs(r.headroom - 0.12) / 0.14)), `${pct(r.headroom)}%`),
        m('thirds', pct(r.thirds)),
        m('size', pct(Math.min(1, r.size * 3)), `${pct(r.size)}%`),
      ];
      return assemble(lang, r.score, metrics, `${v.overall} ${pct(r.score)}% · ${v.bands[bandOf(r.score)]}`);
    }
  }
}
