import type { Test, TestResult } from './types.ts';
import {
  MBTI_THRESHOLD, axisSums, chosenOpts, mbtiAxisScores, resolveResult,
} from './test-score.ts';

/**
 * 결과가 «왜» 그렇게 나왔는지 되짚는다.
 *
 * ── 왜 필요한가 (2026-08-20) ───────────────────────────────
 * 테스트가 288종인데 결과가 유형 이름 하나와 설명 한 단락으로 끝난다. 열 문항을
 * 눌러 놓고 「당신은 ○○형입니다」만 받으면, 그게 내 답에서 나온 것인지 아무
 * 근거가 없다. 사주 궁합에서 네 자리를 각각 낸 것과 같은 이유다 — 점수 하나만
 * 내밀면 그 숫자가 무슨 뜻인지 아무도 모른다.
 *
 * ── 데이터를 안 늘린다 ─────────────────────────────────────
 * 288종에 설명을 손으로 붙이면 288벌을 쓰는 일이다. 그럴 필요가 없다. 채점에
 * 쓰는 것(고른 보기의 점수·축·표)이 이미 답을 갖고 있어서, 같은 재료로 되짚기만
 * 하면 **288종 전부에 한 번에** 붙는다.
 *
 * ── 네 가지 채점마다 「왜」가 다르다 ────────────────────────
 *   점수합   어느 구간에 들었고 옆 구간과 몇 점 차이인가
 *   MBTI     축 넷이 각각 어느 쪽으로 얼마나 기울었나
 *   범주형   어느 유형이 몇 표를 받았고 2위와 몇 표 차이인가
 *   사분면   축 둘이 각각 어느 쪽으로 얼마나 기울었나
 *
 * 공통으로 «가장 크게 민 답» 셋을 낸다. 그 문항에서 고를 수 있었던 보기들의
 * 한가운데에서 얼마나 벗어났는지로 잰다 — 무난한 보기를 고른 문항은 결과를
 * 밀지 않았고, 끝쪽을 고른 문항이 민 것이다.
 */

export interface WhyAxis {
  /** '외향 ↔ 내향'처럼 두 끝을 보여 준다 */
  label: string;
  /** 기운 쪽 이름 */
  side: string;
  /** 0~100 — 기운 정도. 50이 한가운데다 */
  percent: number;
  /** 한가운데에 가까우면 «반반»이라고 말해 준다 */
  even: boolean;
}

export interface WhySwing {
  qIndex: number;
  q: string;
  answer: string;
  /** 그 문항의 한가운데에서 벗어난 정도 — 클수록 결과를 크게 밀었다 */
  push: number;
}

export interface WhyMargin {
  runnerUp: string;
  /** 1위와의 차이(점수합은 점, 범주형은 표) */
  gap: number;
  unit: '점' | '표';
}

export interface TestWhy {
  kind: 'score' | 'mbti' | 'category' | 'quadrant';
  /** 한 줄 요약 — 「12문항 가운데 아홉이 이쪽을 가리켰습니다」 */
  headline: string;
  axes: WhyAxis[];
  swings: WhySwing[];
  margin?: WhyMargin;
}

const MBTI_LABELS: Record<string, [string, string]> = {
  EI: ['외향 E', '내향 I'],
  SN: ['감각 S', '직관 N'],
  TF: ['사고 T', '감정 F'],
  JP: ['판단 J', '인식 P'],
};

/**
 * 그 문항에서 고른 보기가 한가운데에서 얼마나 벗어났는가.
 *
 * 보기가 4점·3점·2점·1점이면 한가운데는 2.5다. 4점을 고르면 1.5만큼 밀었고
 * 3점을 고르면 0.5만큼 민 것이다. 문항마다 점수 폭이 달라도 이 방식이면
 * 같은 자로 잰다.
 */
function pushOf(scores: number[], picked: number): number {
  if (!scores.length) return 0;
  const mid = (Math.max(...scores) + Math.min(...scores)) / 2;
  return Math.abs(picked - mid);
}

/** 결과를 크게 민 답 셋 — 동점이면 앞 문항이 먼저다 */
function topSwings(test: Test, picks: number[], limit = 3): WhySwing[] {
  return picks
    .map((oi, qi) => {
      const q = test.questions[qi];
      const opt = q?.opts[oi];
      if (!q || !opt) return null;
      return {
        qIndex: qi,
        q: q.q.replace(/\n/g, ' '),
        answer: opt.text,
        push: Math.round(pushOf(q.opts.map(o => o.score), opt.score) * 10) / 10,
      };
    })
    .filter((s): s is WhySwing => s !== null && s.push > 0)
    .sort((a, b) => b.push - a.push || a.qIndex - b.qIndex)
    .slice(0, limit);
}

function scoreWhy(test: Test, picks: number[], result: TestResult): TestWhy {
  const total = chosenOpts(test, picks).reduce((s, o) => s + o.score, 0);
  /* 옆 구간과 몇 점 차이인가 — 「2점만 달랐어도 다른 결과였다」가 이 층의 값어치다 */
  const others = test.results.filter(r => r !== result);
  let margin: WhyMargin | undefined;
  if (others.length) {
    const near = others.reduce((best, r) => {
      const d = total < r.min ? r.min - total : total > r.max ? total - r.max : 0;
      const bd = total < best.min ? best.min - total : total > best.max ? total - best.max : 0;
      return d < bd ? r : best;
    });
    const gap = total < near.min ? near.min - total : total > near.max ? total - near.max : 0;
    margin = { runnerUp: near.title, gap, unit: '점' };
  }
  const span = result.max - result.min;
  const within = span > 0 ? Math.round(((total - result.min) / span) * 100) : 50;
  return {
    kind: 'score',
    headline: `${test.questions.length}문항 합계 ${total}점 — ${result.min}~${result.max}점 구간입니다.`,
    axes: [{
      label: `${result.min}점 ↔ ${result.max}점`,
      side: result.title,
      percent: Math.min(100, Math.max(0, within)),
      even: false,
    }],
    swings: topSwings(test, picks),
    margin,
  };
}

function mbtiWhy(test: Test, picks: number[]): TestWhy {
  const scores = mbtiAxisScores(test, picks);
  /* 축마다 문항이 몇 개인지 세어 만점을 낸다 — 넷으로 못 박으면 문항 수가 바뀔 때 틀린다 */
  const maxOf: Record<string, number> = {};
  test.questions.forEach(q => {
    if (!q.axis) return;
    maxOf[q.axis] = (maxOf[q.axis] ?? 0) + Math.max(...q.opts.map(o => o.score));
  });
  const axes: WhyAxis[] = Object.keys(MBTI_LABELS)
    .filter(a => a in scores)
    .map(a => {
      const [hi, lo] = MBTI_LABELS[a];
      const max = maxOf[a] || 1;
      const percent = Math.round((scores[a] / max) * 100);
      const strong = scores[a] >= MBTI_THRESHOLD;
      return {
        label: `${hi} ↔ ${lo}`,
        side: strong ? hi : lo,
        percent: strong ? percent : 100 - percent,
        even: Math.abs(scores[a] - MBTI_THRESHOLD) <= 1,
      };
    });
  const wobbly = axes.filter(a => a.even).length;
  return {
    kind: 'mbti',
    headline: wobbly
      ? `축 ${axes.length}개 가운데 ${wobbly}개는 반반에 가깝습니다 — 그 자리는 날에 따라 달라질 수 있어요.`
      : `축 ${axes.length}개가 모두 한쪽으로 뚜렷하게 기울었습니다.`,
    axes,
    swings: topSwings(test, picks),
  };
}

function categoryWhy(test: Test, picks: number[], result: TestResult): TestWhy {
  const chosen = chosenOpts(test, picks);
  const votes: Record<string, number> = {};
  for (const o of chosen) if (o.k) votes[o.k] = (votes[o.k] ?? 0) + 1;

  const named = test.results
    .map(r => ({ title: r.title, k: r.k, n: votes[r.k ?? ''] ?? 0 }))
    .sort((a, b) => b.n - a.n);
  const win = votes[result.k ?? ''] ?? 0;
  const runner = named.find(r => r.k !== result.k);

  return {
    kind: 'category',
    headline: `${chosen.length}문항 가운데 ${win}개가 «${result.title}»을 가리켰습니다.`,
    axes: named
      .filter(r => r.n > 0)
      .map(r => ({
        label: r.title,
        side: `${r.n}표`,
        percent: Math.round((r.n / chosen.length) * 100),
        even: false,
      })),
    swings: topSwings(test, picks),
    margin: runner ? { runnerUp: runner.title, gap: win - runner.n, unit: '표' } : undefined,
  };
}

function quadrantWhy(test: Test, picks: number[]): TestWhy {
  const sums = axisSums(chosenOpts(test, picks));
  /* 축마다 최대로 갈 수 있는 값 — 기운 정도를 백분율로 내려면 필요하다 */
  const maxOf: number[] = [];
  for (const q of test.questions) {
    for (const o of q.opts) (o.ax ?? []).forEach((v, i) => {
      maxOf[i] = Math.max(maxOf[i] ?? 0, Math.abs(v));
    });
  }
  const axes: WhyAxis[] = sums.map((v, i) => {
    const max = (maxOf[i] ?? 1) * test.questions.length;
    return {
      label: `축 ${i + 1}`,
      side: v > 0 ? '+' : '−',
      percent: Math.min(100, Math.round((Math.abs(v) / (max || 1)) * 100)),
      even: v === 0,
    };
  });
  return {
    kind: 'quadrant',
    headline: `축 ${axes.length}개의 기운 방향이 결과를 정했습니다.`,
    axes,
    swings: topSwings(test, picks),
  };
}

/**
 * 결과를 되짚는다. 채점 방식에 맞는 설명을 낸다.
 *
 * 화면과 같은 결과를 봐야 하므로 resolveResult를 함께 쓴다 — 여기서 따로
 * 계산하면 둘이 어긋나 «설명은 A인데 결과는 B»가 된다.
 */
export function explainTest(test: Test, picks: number[]): TestWhy | null {
  if (picks.length !== test.questions.length) return null;
  const result = resolveResult(test, picks);
  if (test.type === 'mbti') return mbtiWhy(test, picks);
  if (test.type === 'category') return categoryWhy(test, picks, result);
  if (test.type === 'quadrant') return quadrantWhy(test, picks);
  return scoreWhy(test, picks, result);
}
