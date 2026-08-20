import type { ReactElement } from 'react';
import { ogGlyph } from './og-icons';

/** 공유(OG) 이미지 공통 규격·템플릿 — next/og(Satori)로 렌더 */
import { OG_SIZE } from './og-size.ts';
export { OG_SIZE, OG_CONTENT_TYPE } from './og-size.ts';

/** #rrggbb → rgba(r,g,b,a) */
export function alpha(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** 왼쪽 글 영역의 안쪽 폭. 이보다 넘치면 오른쪽 그림을 침범한다. */
/** 자간을 벌리면 결합 문자가 흩어지는 문자 계열 (데바나가리) */
const INDIC = /[\u0900-\u097F]/;

const TEXT_BOX = 624;

/**
 * 설명문에 섞인 이모지를 뺀다.
 *
 * 사이트 데이터의 desc는 "…탈탈 털어보자 🧓"처럼 이모지로 끝나는 게 꽤 있다.
 * 화면에서는 괜찮지만 카드에서는 컬러 이모지가 흑백 아이콘 옆에 끼어들어
 * 한 세트로 안 보인다.
 *
 * 화살표(U+2190~21FF)는 건드리지 않는다 — 계산기 설명이 "월급 → 실수령액"처럼
 * 화살표를 문장 부호로 쓴다.
 *
 * 괘선(U+2500~257F)과 도형(U+25A0~25FF)도 뺀다. 이모지가 아니라서 남겨 뒀는데,
 * 카드용 동적 폰트가 이 글자들을 받지 못해 빌드 로그에 400이 찍히고 카드에는
 * 빈 칸이 그려졌다 — 문자 이모티콘 설명의 "(╯°□°）╯"가 그랬다.
 */
export function stripForCard(text: string): string {
  return text
    // 합자 기호는 폰트 서비스가 400을 낸다 — 지우지 말고 같은 뜻의 ASCII로 편다
    .replace(/\u2103/g, '°C')
    .replace(/\u2109/g, '°F')
    .replace(/\u33A1/g, 'm2')
    .replace(/\u33A5/g, 'm3')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2300}-\u{23FF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}]/gu, '')
    .replace(/[\u{2500}-\u{259F}\u{25A0}-\u{25FF}]/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** 그림의 중심과 크기 — 궤도·후광·아이콘이 모두 이 값을 기준으로 놓인다 */
const ART_X = 892;
const ART_Y = 315;
const GLYPH = 280;

/**
 * 글자 하나가 차지하는 폭을 em 단위로 어림한다.
 * 한글·한자·가나는 정사각에 가깝고 라틴·숫자·문장부호는 절반 남짓이다.
 * 글자 수만 세면 "판타지 이름 생성기"와 "Fantasy Name Generator"가 같은
 * 길이로 잡혀 한쪽은 넘치고 한쪽은 쪼그라든다.
 */
function charUnits(ch: string): number {
  const c = ch.codePointAt(0) ?? 0;
  if (c >= 0xac00 && c <= 0xd7a3) return 1;      // 한글 음절
  if (c >= 0x1100 && c <= 0x11ff) return 1;      // 한글 자모
  if (c >= 0x2e80 && c <= 0xa4cf) return 1;      // 한자·가나·부수
  if (c >= 0xf900 && c <= 0xfaff) return 1;      // 한자 호환
  if (c >= 0xff00 && c <= 0xff60) return 1;      // 전각
  if (c >= 0x1f000) return 1;                    // 이모지
  return 0.55;
}

/**
 * 제목 폰트 크기.
 *
 * Satori에는 넘친 글자를 잘라낼 수단이 마땅치 않아서, 넘치면 그대로 그림
 * 위로 올라탄다. 그래서 폭을 미리 재고 크기를 맞춘다 — 한 줄에 들어가면
 * 크게 뽑고, 안 되면 두 줄 기준으로 줄인다. 두 줄 계산에 1.15를 곱하는 건
 * 단어 단위 줄바꿈이라 줄 끝에 늘 빈 자리가 남기 때문이다.
 */
function titleSize(title: string): number {
  const units = [...title].reduce((s, c) => s + charUnits(c), 0) || 1;
  const oneLine = TEXT_BOX / units;
  if (oneLine >= 56) return Math.min(86, Math.floor(oneLine));
  return Math.max(42, Math.min(66, Math.floor((TEXT_BOX * 2) / (units * 1.15))));
}

/**
 * 카드에서 읽히는 색으로 끌어올린다.
 *
 * eyebrow는 섹션의 to 색을 그대로 썼는데, to가 어두운 섹션이 쉰 곳이다
 * (paper·wifi·ext… 전부 #0f172a, 밝기 23). 카드 배경도 어두우므로 검은 배경에
 * 검은 글씨가 되어 아무도 못 읽는다 — 열 언어를 곱하면 500장이 그랬다.
 * 카드를 열어 보기 전에는 드러나지 않는 종류의 고장이라 오래 남아 있었다.
 *
 * 색상(hue)은 그대로 두고 밝기만 올린다. 섹션마다 다른 색이라는 성질이
 * 카드의 유일한 구분 수단이라 그것을 잃으면 안 된다.
 */
/** 둘 중 밝은 쪽 — 섹션 색을 살리려면 어두운 to보다 from이 나을 때가 많다 */
export function brighter(a: string, b: string): string {
  const lum = (h: string) => {
    const n = parseInt(h.slice(1), 16);
    return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  };
  return lum(a) >= lum(b) ? a : b;
}

export function readableOnDark(hex: string, minLum = 140): string {
  const n = parseInt(hex.slice(1), 16);
  let [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255];
  const lum = () => 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum() >= minLum) return hex;
  /* 흰색 쪽으로 섞어 올린다 — 색상은 유지되고 밝기만 오른다 */
  const k = Math.min(1, (minLum - lum()) / (255 - lum()));
  r = Math.round(r + (255 - r) * k);
  g = Math.round(g + (255 - g) * k);
  b = Math.round(b + (255 - b) * k);
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * 그라디언트를 **계단으로** 쪼갠다 — 카드 크기를 아홉 배 줄인다.
 *
 * PNG는 무손실이라 매끄러운 그라디언트를 저장할 때 픽셀마다 조금씩 다른 색을
 * 그대로 적는다. 1200×630 카드 한 장이 226KB가 되고, 이미 압축된 형식이라
 * 전송할 때 더 줄지도 않는다(gzip 후 221KB). 카드가 1,899장이면 한 번 훑을 때
 * 420MB다 — Vercel 무료 티어의 전송 한도(10GB)를 갉아먹은 자리가 여기다.
 *
 * 계단으로 쪼개면 같은 색이 넓게 이어져 PNG가 그것을 한 줄로 줄인다.
 * 실측: 매끄러움 281KB · 열다섯 계단 32KB · 단색 22KB.
 *
 * 계단 수는 카드에서 눈에 안 띄는 선에서 정했다. 어두운 배경에서 열여섯이면
 * 사람 눈으로는 매끄러운 것과 구분되지 않는다.
 */
const BANDS = 16;

/** [위치, 색] 목록을 계단 stop으로 편다 */
function banded(stops: [number, string][]): ReactElement[] {
  const out: ReactElement[] = [];
  for (let i = 0; i < BANDS; i++) {
    const t0 = i / BANDS;
    const t1 = (i + 1) / BANDS;
    const c = sampleColor(stops, (t0 + t1) / 2);
    out.push(<stop key={`${i}a`} offset={`${t0 * 100}%`} stopColor={c} />);
    out.push(<stop key={`${i}b`} offset={`${t1 * 100}%`} stopColor={c} />);
  }
  return out;
}

/** 투명도만 변하는 그라디언트 — 색은 하나다 */
function bandedAlpha(color: string, stops: [number, number][]): ReactElement[] {
  const out: ReactElement[] = [];
  for (let i = 0; i < BANDS; i++) {
    const t0 = i / BANDS;
    const t1 = (i + 1) / BANDS;
    const a = sampleNumber(stops, (t0 + t1) / 2);
    out.push(<stop key={`${i}a`} offset={`${t0 * 100}%`} stopColor={color} stopOpacity={a} />);
    out.push(<stop key={`${i}b`} offset={`${t1 * 100}%`} stopColor={color} stopOpacity={a} />);
  }
  return out;
}

/** 위치 t에서의 색 — 앞뒤 stop을 선형으로 섞는다 */
function sampleColor(stops: [number, string][], t: number): string {
  const i = Math.max(0, stops.findIndex(s => s[0] >= t));
  if (i <= 0) return stops[0][1];
  const [p0, c0] = stops[i - 1];
  const [p1, c1] = stops[i];
  const k = p1 === p0 ? 0 : (t - p0) / (p1 - p0);
  const mix = (a: string, b: string) => {
    const hex = (h: string, o: number) => parseInt(h.slice(1 + o, 3 + o), 16);
    const v = (o: number) => Math.round(hex(a, o) + (hex(b, o) - hex(a, o)) * k);
    return `#${[0, 2, 4].map(o => v(o).toString(16).padStart(2, '0')).join('')}`;
  };
  return mix(c0, c1);
}

function sampleNumber(stops: [number, number][], t: number): number {
  const i = Math.max(0, stops.findIndex(s => s[0] >= t));
  if (i <= 0) return stops[0][1];
  const [p0, a0] = stops[i - 1];
  const [p1, a1] = stops[i];
  const k = p1 === p0 ? 0 : (t - p0) / (p1 - p0);
  return Number((a0 + (a1 - a0) * k).toFixed(3));
}

/**
 * 카드 그림 — 1200×630 한 장을 통째로 그린 SVG.
 *
 * 배경·빛·궤도·아이콘이 전부 이 안에 있다. CSS로 배경을 깔고 그 위에 작은
 * 아이콘만 얹으면 "동그라미 안에 아이콘" 이상이 안 나오는데, 한 좌표계
 * 안에서 그리면 궤도와 아이콘 크기를 맞춰 배치할 수 있다.
 *
 * Satori가 지원하는 SVG는 제한적이다. defs·linearGradient·radialGradient·
 * g transform·path·circle·rect까지는 통과하지만 filter·mask·use·clipPath는
 * 쓰지 않는다.
 */
/**
 * ── 카드가 전부 똑같아 보였다 (2026-08-20) ──────────────────
 * 2,013장이 한 판을 썼다 — 남색 그라디언트, 왼쪽 글, 오른쪽 원궤도. 색 두 개와
 * 아이콘만 달라서 목록에 늘어놓으면 하나로 뭉개졌다.
 *
 * 갈래마다 그림의 «짜임»을 바꾼다. 무작위가 아니라 갈래로 가른다 — 그래야
 * 다름이 장식이 아니라 정보가 된다. 계산기는 모눈, 운세는 별자리, 테스트는
 * 파문, 사진·색은 띠, 개발·문자는 격자다.
 *
 * 어떻게 갈래를 아는가: 카드를 그리는 함수는 열쇠를 안 받는다(2,013곳을 고칠
 * 수 없다). 대신 lib/og-cards/render.ts가 그리기 **직전에** 여기 넣어 준다.
 * make()는 JSX를 짓기만 하는 동기 함수라 넣고 읽는 사이에 끼어들 틈이 없다.
 */
export type CardConcept = 'grid' | 'star' | 'ripple' | 'band' | 'mono' | 'orbit';

const CONCEPT_BY_SECTION: Record<string, CardConcept> = {
  calculator: 'grid', rate: 'grid', percent: 'grid', number: 'grid', times: 'grid',
  fraction: 'grid', sqrt: 'grid', geometry: 'grid', convert: 'grid', year: 'grid',
  crypto: 'grid', body: 'grid',

  fortune: 'star', quiz: 'star', hanja: 'star',

  test: 'ripple', checklist: 'ripple', generator: 'ripple', random: 'ripple',

  snap: 'band', image: 'band', color: 'band', craft: 'band', food: 'band',

  text: 'mono', code: 'mono', http: 'mono', port: 'mono', ascii: 'mono',
  keycode: 'mono', cidr: 'mono', chmod: 'mono', ext: 'mono', emoji: 'mono',
  password: 'mono', shortcut: 'mono', cmd: 'mono',
};

/**
 * 컨셉마다 바탕 잉크가 다르다.
 *
 * 컨셉만 갈라 놓고 바탕을 그대로 두었더니 여전히 «전부 남색»이었다. 짜임보다
 * 먼저 눈에 들어오는 것은 색이라, 톤이 같으면 다른 그림도 같은 카드로 읽힌다.
 *
 * 셋 다 어두운 잉크지만 계열이 다르다 — 계산기는 차가운 강청, 운세는 따뜻한
 * 자두, 테스트는 보라, 색·사진은 거의 검정, 개발은 흑녹이다. 흰 글자가
 * 얹히므로 어느 것도 밝게 가지 않는다.
 */
const GROUND: Record<CardConcept, [string, string, string]> = {
  grid:   ['#0e1b33', '#050a14', '#08111f'],   // 강청 — 도면·수치
  star:   ['#241428', '#0b060d', '#150a16'],   // 자두 — 밤하늘
  ripple: ['#1b1636', '#080611', '#100c22'],   // 보라 — 마음
  band:   ['#141018', '#050406', '#0b090e'],   // 먹 — 색이 주인공이라 바탕을 비운다
  mono:   ['#0d1a17', '#040908', '#071210'],   // 흑녹 — 단말기
  orbit:  ['#12142c', '#06070f', '#0a0b18'],   // 원래 쓰던 남색
};


/* ── 갈래별 장면 (2026-08-20) ──────────────────────────────────
   아이콘 하나를 가운데 얹는 것으로는 «무슨 도구인지»만 말한다. 주요 갈래는
   장면을 직접 그린다 — 운세는 밤 능선과 달, 계산기는 영수증과 막대, 테스트는
   옆얼굴과 파문, 색은 겹친 색 견본이다.

   장면이 있는 갈래는 무늬와 아이콘을 대신한다(둘 다 그리면 겹쳐서 지저분하다).
   장면이 없는 갈래는 지금까지대로 무늬 + 아이콘이다.

   좌표는 아이콘 자리(ART_X, ART_Y)를 원점으로 잡는다. Satori가 받는 것만
   쓴다 — rect·circle·path·g/transform. */

const W = '#ffffff';

/** 운세 — 밤 능선 위로 달이 뜨고 별이 흩어진다 */
function sceneFortune(to: string): ReactElement[] {
  const stars: [number, number, number][] = [
    [-240, -170, 3], [-160, -120, 2], [-90, -195, 4], [40, -160, 2.5],
    [130, -205, 3], [210, -130, 2], [-210, -60, 2], [190, -40, 2.5],
  ];
  return [
    /*
      보름달이다. 초승달을 시도했다가 두 번 실패했다 —
        원 두 개로 겹치면 «가린 쪽»을 바탕색으로 칠해야 하는데 바탕이
        그라디언트라 어느 색으로도 안 맞아 검은 행성처럼 보였다.
        호 두 개짜리 path는 두 원의 반지름이 달라 끝점이 안 만나 통째로
        사라졌다(SVG가 그릴 수 없는 호다).
      달무리 한 겹을 둘러 «밤»이라는 것은 그대로 전한다.
    */
    <circle key="halo" cx={ART_X + 70} cy={ART_Y - 110} r={104} fill={W} fillOpacity="0.06" />,
    <circle key="moon" cx={ART_X + 70} cy={ART_Y - 110} r={78} fill={W} fillOpacity="0.94" />,
    ...stars.map(([x, y, r], i) => (
      <circle key={`s${i}`} cx={ART_X + x} cy={ART_Y + y} r={r} fill={i % 3 === 0 ? to : W} fillOpacity={i % 3 === 0 ? 1 : 0.7} />
    )),
    /* 능선 두 겹 — 뒤가 흐리고 앞이 진하다 */
    <path key="ridge2" d={`M ${ART_X - 320} ${ART_Y + 210} L ${ART_X - 150} ${ART_Y + 70} L ${ART_X - 30} ${ART_Y + 160} L ${ART_X + 110} ${ART_Y + 40} L ${ART_X + 320} ${ART_Y + 210} Z`}
      fill={to} fillOpacity="0.30" />,
    <path key="ridge1" d={`M ${ART_X - 320} ${ART_Y + 230} L ${ART_X - 190} ${ART_Y + 140} L ${ART_X - 60} ${ART_Y + 205} L ${ART_X + 60} ${ART_Y + 120} L ${ART_X + 200} ${ART_Y + 200} L ${ART_X + 320} ${ART_Y + 150} L ${ART_X + 320} ${ART_Y + 230} Z`}
      fill={W} fillOpacity="0.07" />,
  ];
}

/** 계산기 — 영수증 한 장과 값이 오르는 막대 */
function sceneCalc(to: string): ReactElement[] {
  const x = ART_X - 150, y = ART_Y - 190;
  /* 좌표는 그룹 안이라 0부터다. 처음에 x+26처럼 절대 좌표를 써서 두 번 밀렸고
     줄이 화면 밖으로 나가 종이가 비어 보였다. */
  const lines = [0, 1, 2, 3].map(i => (
    <rect key={`ln${i}`} x={26} y={66 + i * 34} width={i === 3 ? 96 : 168} height={9} rx={4.5}
      fill={W} fillOpacity={i === 3 ? 0.85 : 0.34} />
  ));
  return [
    /* 영수증 — 아래를 톱니로 자르지 않고 살짝 기울여 종이임을 알린다 */
    <g key="paper" transform={`translate(${x} ${y}) rotate(-4)`}>
      <rect x={0} y={0} width={220} height={300} rx={10} fill={W} fillOpacity="0.10" />
      <rect x={0} y={0} width={220} height={300} rx={10} fill="none" stroke={W} strokeOpacity="0.22" strokeWidth={2} />
      <rect x={26} y={28} width={78} height={12} rx={6} fill={to} />
    </g>,
    <g key="paperlines" transform={`translate(${x} ${y}) rotate(-4)`}>{lines}</g>,
    /* 막대 셋 — 오른쪽 아래에서 올라온다 */
    <rect key="b1" x={ART_X + 60} y={ART_Y + 40} width={44} height={110} rx={8} fill={to} fillOpacity="0.45" />,
    <rect key="b2" x={ART_X + 118} y={ART_Y - 30} width={44} height={180} rx={8} fill={to} fillOpacity="0.75" />,
    <rect key="b3" x={ART_X + 176} y={ART_Y - 110} width={44} height={260} rx={8} fill={to} />,
  ];
}

/** 테스트 — 옆얼굴 안에서 파문이 퍼진다 */
function sceneTest(to: string): ReactElement[] {
  const cx = ART_X - 10, cy = ART_Y;
  const rings = [58, 100, 142, 184].map((r, i) => (
    <circle key={`r${i}`} cx={cx + 18} cy={cy - 10} r={r} fill="none" stroke={i % 2 ? W : to}
      strokeOpacity={i % 2 ? 0.10 : 0.45 - i * 0.08} strokeWidth={i % 2 ? 2 : 3} />
  ));
  return [
    ...rings,
    /* 옆얼굴 윤곽 — 한 획으로 이마·코·입·턱 */
    <path key="face"
      d={`M ${cx - 120} ${cy - 190}
          C ${cx + 40} ${cy - 210}, ${cx + 108} ${cy - 96}, ${cx + 96} ${cy - 30}
          C ${cx + 90} ${cy + 2}, ${cx + 128} ${cy + 18}, ${cx + 104} ${cy + 40}
          C ${cx + 88} ${cy + 54}, ${cx + 96} ${cy + 64}, ${cx + 84} ${cy + 78}
          C ${cx + 70} ${cy + 94}, ${cx + 76} ${cy + 140}, ${cx + 40} ${cy + 176}`}
      fill="none" stroke={W} strokeOpacity="0.92" strokeWidth={7} strokeLinecap="round" />,
    <circle key="dot" cx={cx + 18} cy={cy - 10} r={13} fill={to} />,
  ];
}

/** 색 — 색 견본이 부채처럼 겹친다 */
function sceneColor(to: string): ReactElement[] {
  const tilts = [-24, -12, 0, 12, 24];
  return tilts.map((t, i) => (
    <g key={`sw${i}`} transform={`translate(${ART_X} ${ART_Y + 60}) rotate(${t})`}>
      <rect x={-62} y={-250} width={124} height={230} rx={16}
        fill={i === 2 ? to : W} fillOpacity={i === 2 ? 1 : 0.10 + Math.abs(2 - i) * 0.04} />
      <rect x={-62} y={-250} width={124} height={230} rx={16}
        fill="none" stroke={W} strokeOpacity="0.20" strokeWidth={2} />
    </g>
  ));
}

/*
  아래 장면들은 전부 `<g transform="translate(ART_X ART_Y)">` 한 겹 안에 넣고
  안에서는 «상대 좌표»만 쓴다. 위 네 장면처럼 ART_X를 일일이 더하면 그룹 안에
  또 더해져 두 번 밀린다(실제로 그렇게 틀린 적이 있다).

  가로는 -180 ~ +300 안에 둔다. 왼쪽 글 상자가 x=702까지 오므로 -190부터는
  글자를 침범하고, 오른쪽은 캔버스가 1200에서 끝난다.
  세로는 -230 ~ +230 (실제 y 85 ~ 545).
*/
function at(children: ReactElement[]): ReactElement[] {
  return [<g key="scene" transform={`translate(${ART_X} ${ART_Y})`}>{children}</g>];
}

/** 사진 — 렌즈 꼭짓점에서 퍼지는 화각, 그 안에 선 초점면 */
function sceneSnap(to: string): ReactElement[] {
  /* 화각의 위·아래 모서리를 x에 따라 되짚는다 — 초점면 높이를 여기서 얻는다 */
  const half = (x: number) => 178 * ((x + 170) / 460);
  const plane = (x: number, w: number, fill: string, op: number) => {
    const h = half(x);
    return <rect key={`pl${x}`} x={x} y={20 - h} width={w} height={h * 2} rx={4} fill={fill} fillOpacity={op} />;
  };
  return at([
    /* 화각 — 꼭짓점에서 오른쪽으로 벌어지는 삼각형 */
    <path key="cone" d="M -170 20 L 290 -158 L 290 198 Z" fill="#ffffff" fillOpacity="0.07" />,
    <path key="edge" d="M -170 20 L 290 -158 M -170 20 L 290 198" fill="none" stroke="#ffffff" strokeOpacity="0.30" strokeWidth={3} />,
    /* 앞·뒤로 흐린 면, 가운데 하나만 초점이 맞는다 */
    plane(-20, 8, '#ffffff', 0.16),
    plane(230, 8, '#ffffff', 0.16),
    plane(110, 16, to, 1),
    /* 렌즈 자리 */
    <circle key="v" cx={-170} cy={20} r={11} fill="#ffffff" fillOpacity="0.9" />,
    <circle key="vh" cx={-170} cy={20} r={26} fill="none" stroke={to} strokeOpacity="0.8" strokeWidth={4} />,
  ]);
}

/** 문자 — 줄지어 선 글줄, 한 줄이 선택되어 있고 끝에 커서가 선다 */
function sceneText(to: string): ReactElement[] {
  const w = [258, 300, 196, 282, 214, 148];
  return at([
    <rect key="sel" x={-166} y={-98} width={208} height={38} rx={6} fill={to} fillOpacity="0.40" />,
    ...w.map((v, i) => (
      <rect key={`l${i}`} x={-160} y={-190 + i * 54} width={v} height={16} rx={8}
        fill="#ffffff" fillOpacity={i === 2 ? 0.92 : 0.34} />
    )),
    /* 마지막 줄 끝의 깜빡이는 자리 */
    <rect key="caret" x={-160 + w[5] + 12} y={-198 + 5 * 54} width={7} height={38} rx={3} fill={to} />,
  ]);
}

/** 시간 — 어긋나게 겹친 시간대 눈금 셋을 «지금» 한 줄이 가로지른다 */
function sceneTime(to: string): ReactElement[] {
  const out: ReactElement[] = [];
  [-150, -50, 50].forEach((y, b) => {
    out.push(<rect key={`b${b}`} x={-170} y={y} width={460} height={62} rx={10} fill="#ffffff" fillOpacity="0.08" />);
    /* 자마다 눈금을 조금씩 밀어 둔다 — 시차가 그림이 된다 */
    for (let i = 0; i < 12; i++) {
      const x = -160 + i * 40 + b * 13;
      if (x > 282) continue;
      const big = i % 3 === 0;
      out.push(<rect key={`t${b}-${i}`} x={x} y={y + 62 - (big ? 30 : 16)} width={3} height={big ? 30 : 16}
        fill="#ffffff" fillOpacity={big ? 0.55 : 0.28} />);
    }
  });
  /* 「지금」 — 세 자를 한 번에 꿰뚫는다 */
  out.push(<rect key="now" x={54} y={-172} width={5} height={306} rx={2.5} fill={to} />);
  out.push(<circle key="nowd" cx={56.5} cy={-172} r={10} fill={to} />);
  /* 지평선과 낮 구간 — 밤낮이 자리마다 다르다는 것 */
  out.push(<rect key="hz" x={-170} y={180} width={460} height={3} fill="#ffffff" fillOpacity="0.25" />);
  out.push(<rect key="day" x={-170} y={177} width={224} height={9} rx={4.5} fill={to} fillOpacity="0.85" />);
  return at(out);
}

/** 이미지 — 사진 위에 놓인 자르기 틀과 모서리 손잡이 */
function sceneImage(to: string): ReactElement[] {
  const cx = -60, cy = -100, cw = 252, ch = 200;
  const corners: [number, number][] = [[cx, cy], [cx + cw, cy], [cx, cy + ch], [cx + cw, cy + ch]];
  return at([
    /* 사진 한 장 — 안에 능선과 해가 어렴풋이 */
    <rect key="ph" x={-160} y={-170} width={400} height={300} rx={14} fill="#ffffff" fillOpacity="0.10" />,
    <rect key="phb" x={-160} y={-170} width={400} height={300} rx={14} fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth={3} />,
    <circle key="sun" cx={-70} cy={-108} r={30} fill="#ffffff" fillOpacity="0.22" />,
    <path key="hill" d="M -160 130 L -50 10 L 30 90 L 130 -20 L 240 130 Z" fill="#ffffff" fillOpacity="0.16" />,
    /* 자르기 틀 */
    <rect key="crop" x={cx} y={cy} width={cw} height={ch} fill="none" stroke={to} strokeWidth={5} />,
    ...corners.map(([x, y], i) => <circle key={`c${i}`} cx={x} cy={y} r={10} fill={to} />),
    /* 치수선 — 자른 폭을 잰다 */
    <rect key="dim" x={cx} y={cy + ch + 44} width={cw} height={3} fill="#ffffff" fillOpacity="0.45" />,
    <rect key="dl" x={cx} y={cy + ch + 32} width={3} height={27} fill="#ffffff" fillOpacity="0.45" />,
    <rect key="dr" x={cx + cw - 3} y={cy + ch + 32} width={3} height={27} fill="#ffffff" fillOpacity="0.45" />,
  ]);
}

/** 소리 — 파형 */
function sceneSound(to: string): ReactElement[] {
  const bars: ReactElement[] = [];
  for (let i = 0; i < 22; i++) {
    /* 봉투(가운데가 크다) × 잔결. 난수가 아니라 식이라 매번 같은 파형이 나온다 */
    const env = Math.cos(((i - 10.5) / 11) * Math.PI * 0.5);
    const h = 26 + 200 * env * env * (0.55 + 0.45 * Math.abs(Math.sin(i * 1.9)));
    const near = Math.abs(i - 10.5) < 3.5;
    bars.push(<rect key={`w${i}`} x={-166 + i * 21} y={-h / 2} width={11} height={h} rx={5.5}
      fill={near ? to : '#ffffff'} fillOpacity={near ? 1 : 0.45} />);
  }
  return at([
    <rect key="axis" x={-180} y={-1.5} width={480} height={3} fill="#ffffff" fillOpacity="0.16" />,
    ...bars,
  ]);
}

/** 게임 — 기울여 놓인 판과 그 위의 말 */
function sceneGame(to: string): ReactElement[] {
  const S = 66, N = 4, x0 = -132, y0 = -132;
  const cells: ReactElement[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      cells.push(<rect key={`g${r}-${c}`} x={x0 + c * S} y={y0 + r * S} width={S} height={S}
        fill="#ffffff" fillOpacity={(r + c) % 2 ? 0.14 : 0.05} />);
    }
  }
  const mid = (i: number) => x0 + i * S + S / 2;
  return at([
    <g key="board" transform="rotate(-11)">
      {cells}
      <rect x={x0} y={y0} width={N * S} height={N * S} fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth={3} />
      {/* 말 셋 — 둘은 내 것, 하나는 상대 것 */}
      <circle cx={mid(1)} cy={mid(1)} r={22} fill={to} />
      <circle cx={mid(3)} cy={mid(2)} r={22} fill={to} />
      <circle cx={mid(2)} cy={mid(0)} r={22} fill="#ffffff" fillOpacity="0.9" />
    </g>,
    /* 판 밖에 내려놓은 말 */
    <circle key="off" cx={222} cy={172} r={20} fill="#ffffff" fillOpacity="0.55" />,
    <circle key="off2" cx={262} cy={196} r={20} fill={to} fillOpacity="0.8" />,
  ]);
}

/** 음식 — 접시와 계량컵 */
function sceneFood(to: string): ReactElement[] {
  return at([
    <circle key="plate" cx={-20} cy={-52} r={142} fill="#ffffff" fillOpacity="0.08" />,
    <circle key="rim" cx={-20} cy={-52} r={106} fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth={3} />,
    /* 담긴 것은 셋으로 나눠 놓는다 — 원 세 겹을 겹쳐 놓으면 접시가 아니라 과녁이 된다 */
    <circle key="f1" cx={-64} cy={-80} r={46} fill={to} />,
    <circle key="f2" cx={8} cy={-30} r={34} fill={to} fillOpacity="0.6" />,
    <circle key="f3" cx={16} cy={-100} r={25} fill="#ffffff" fillOpacity="0.5" />,
    /* 계량컵 — 눈금 있는 사다리꼴 */
    <g key="cup" transform="translate(110 40)">
      <path d="M 0 0 L 104 0 L 90 130 L 14 130 Z" fill="#ffffff" fillOpacity="0.10"
        stroke="#ffffff" strokeOpacity="0.5" strokeWidth={4} />
      {/* 담긴 것 */}
      <path d="M 7 62 L 97 62 L 90 130 L 14 130 Z" fill={to} fillOpacity="0.8" />
      <rect x={13} y={28} width={28} height={3} fill="#ffffff" fillOpacity="0.5" />
      <rect x={11} y={92} width={41} height={3} fill="#ffffff" fillOpacity="0.5" />
      {/* 손잡이 */}
      <path d="M 104 14 C 142 20, 140 70, 97 76" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth={4} />
    </g>,
  ]);
}

/** 한자 — 습자 칸(米자 보조선) 위에 놓인 붓획 */
function sceneHanja(to: string): ReactElement[] {
  const x0 = -140, y0 = -160, S = 300;
  return at([
    <rect key="cell" x={x0} y={y0} width={S} height={S} fill="#ffffff" fillOpacity="0.05"
      stroke="#ffffff" strokeOpacity="0.3" strokeWidth={3} />,
    /* 보조선 — 십자와 대각 */
    <path key="guide" d={`M ${x0} ${y0 + S / 2} L ${x0 + S} ${y0 + S / 2} M ${x0 + S / 2} ${y0} L ${x0 + S / 2} ${y0 + S}`}
      fill="none" stroke="#ffffff" strokeOpacity="0.20" strokeWidth={2} />,
    <path key="diag" d={`M ${x0} ${y0} L ${x0 + S} ${y0 + S} M ${x0 + S} ${y0} L ${x0} ${y0 + S}`}
      fill="none" stroke="#ffffff" strokeOpacity="0.10" strokeWidth={2} />,
    /* 획 셋 — 가로획, 삐침, 점 */
    <path key="k1" d="M -84 -74 L 106 -82" fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth={17} strokeLinecap="round" />,
    <path key="k2" d="M 12 -122 C 12 -18, -12 62, -78 116" fill="none" stroke={to} strokeWidth={19} strokeLinecap="round" />,
    <path key="k3" d="M 44 20 L 108 96" fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth={15} strokeLinecap="round" />,
  ]);
}

/** 퀴즈 — 문제 한 줄과 동그란 보기 넷, 하나가 골라져 있다 */
function sceneQuiz(to: string): ReactElement[] {
  const w = [236, 198, 268, 176];
  const out: ReactElement[] = [
    <rect key="q1" x={-160} y={-198} width={330} height={17} rx={8.5} fill="#ffffff" fillOpacity="0.6" />,
    <rect key="q2" x={-160} y={-166} width={208} height={17} rx={8.5} fill="#ffffff" fillOpacity="0.32" />,
  ];
  w.forEach((v, i) => {
    const y = -96 + i * 66;
    const on = i === 1;
    out.push(on
      ? <circle key={`o${i}`} cx={-138} cy={y + 14} r={19} fill={to} />
      : <circle key={`o${i}`} cx={-138} cy={y + 14} r={19} fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth={3} />);
    out.push(<rect key={`a${i}`} x={-104} y={y + 4} width={v} height={19} rx={9.5}
      fill="#ffffff" fillOpacity={on ? 0.75 : 0.26} />);
  });
  return at(out);
}

/** 체크리스트 — 네모 칸에 체크가 차오르고 아래로 진행 막대 */
function sceneChecklist(to: string): ReactElement[] {
  const w = [252, 196, 232, 168];
  const out: ReactElement[] = [];
  w.forEach((v, i) => {
    const y = -178 + i * 68;
    const done = i < 3;
    out.push(<rect key={`b${i}`} x={-150} y={y} width={44} height={44} rx={11}
      fill={done ? to : '#ffffff'} fillOpacity={done ? 1 : 0.08}
      stroke="#ffffff" strokeOpacity={done ? 0 : 0.45} strokeWidth={3} />);
    if (done) {
      out.push(<path key={`k${i}`} d={`M ${-139} ${y + 23} L ${-131} ${y + 32} L ${-116} ${y + 12}`}
        fill="none" stroke="#ffffff" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />);
    }
    out.push(<rect key={`t${i}`} x={-92} y={y + 15} width={v} height={15} rx={7.5}
      fill="#ffffff" fillOpacity={done ? 0.28 : 0.5} />);
  });
  out.push(<rect key="bar" x={-150} y={128} width={380} height={15} rx={7.5} fill="#ffffff" fillOpacity="0.12" />);
  out.push(<rect key="fill" x={-150} y={128} width={285} height={15} rx={7.5} fill={to} />);
  return at(out);
}

/** 생성기 — 깔때기에서 조각이 쏟아진다 */
function sceneGenerator(to: string): ReactElement[] {
  const bits: [number, number, number, number, number][] = [
    [-118, 24, 88, 26, -13], [24, 46, 124, 26, 7], [176, 14, 62, 26, 21],
    [-84, 104, 132, 26, 9], [86, 120, 92, 26, -16], [-134, 178, 76, 26, 18],
    [16, 190, 150, 26, -6], [186, 166, 62, 26, 12],
  ];
  return at([
    <path key="hop" d="M -134 -186 L 190 -186 L 70 -62 L -14 -62 Z" fill="#ffffff" fillOpacity="0.12"
      stroke="#ffffff" strokeOpacity="0.32" strokeWidth={3} />,
    <rect key="neck" x={-14} y={-62} width={84} height={34} fill="#ffffff" fillOpacity="0.12" />,
    <rect key="neckb" x={-14} y={-62} width={84} height={34} fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth={3} />,
    ...bits.map(([x, y, w, h, r], i) => (
      <g key={`p${i}`} transform={`translate(${x} ${y}) rotate(${r})`}>
        <rect x={0} y={0} width={w} height={h} rx={13}
          fill={i % 3 === 0 ? to : '#ffffff'} fillOpacity={i % 3 === 0 ? 1 : 0.32} />
      </g>
    )),
  ]);
}

/** 무작위 — 굴러가는 주사위 둘 */
function sceneRandom(to: string): ReactElement[] {
  /* 눈 자리는 -1·0·1 격자로 적고 40씩 벌린다 */
  const pips = (spots: [number, number][], fill: string) =>
    spots.map(([px, py], i) => <circle key={`p${i}`} cx={px * 38} cy={py * 38} r={11} fill={fill} />);
  return at([
    <g key="d1" transform="translate(-38 -78) rotate(-14)">
      <rect x={-68} y={-68} width={136} height={136} rx={26} fill="#ffffff" fillOpacity="0.92" />
      {pips([[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], to)}
    </g>,
    <g key="d2" transform="translate(144 96) rotate(19)">
      <rect x={-60} y={-60} width={120} height={120} rx={24} fill={to} />
      <rect x={-60} y={-60} width={120} height={120} rx={24} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth={3} />
      {pips([[-0.85, -0.85], [0, 0], [0.85, 0.85]], '#ffffff')}
    </g>,
  ]);
}

/** 기기 — 화면 셋이 크기순으로 선다 */
function sceneDevice(to: string): ReactElement[] {
  return at([
    /* 모니터 */
    <rect key="m" x={-160} y={-172} width={306} height={204} rx={14} fill="#ffffff" fillOpacity="0.10"
      stroke="#ffffff" strokeOpacity="0.30" strokeWidth={3} />,
    <rect key="mstem" x={-32} y={32} width={50} height={40} fill="#ffffff" fillOpacity="0.22" />,
    <rect key="mfoot" x={-72} y={72} width={130} height={13} rx={6.5} fill="#ffffff" fillOpacity="0.32" />,
    /* 태블릿 */
    <rect key="t" x={62} y={-58} width={146} height={196} rx={16} fill="#ffffff" fillOpacity="0.16"
      stroke="#ffffff" strokeOpacity="0.34" strokeWidth={3} />,
    /* 손전화 — 하나만 강조색이라 «지금 이 기기»로 읽힌다 */
    <rect key="p" x={176} y={16} width={98} height={190} rx={22} fill={to} />,
    <rect key="pn" x={206} y={30} width={38} height={7} rx={3.5} fill="#ffffff" fillOpacity="0.7" />,
    /* 화면 크기를 재는 대각선 */
    <path key="diag" d="M -140 12 L 126 -152" fill="none" stroke={to} strokeOpacity="0.9" strokeWidth={4} />,
  ]);
}

/** 변환 — 눈금이 다른 두 자가 마주 보고 대응한다 */
function sceneConvert(to: string): ReactElement[] {
  const out: ReactElement[] = [];
  const rule = (y: number, step: number, off: number, key: string, accent: boolean) => {
    out.push(<rect key={`${key}b`} x={-170} y={y} width={444} height={62} rx={10}
      fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.20" strokeWidth={2} />);
    /* 마지막 눈금이 자 밖으로 나가면 캔버스 끝에서 잘려 보인다 */
    for (let x = -170 + off; x <= 258; x += step) {
      const big = Math.round((x + 170 - off) / step) % 2 === 0;
      out.push(<rect key={`${key}${x}`} x={x} y={key === 'a' ? y : y + 62 - (big ? 30 : 16)} width={3}
        height={big ? 30 : 16} fill={accent ? to : '#ffffff'} fillOpacity={accent ? (big ? 1 : 0.5) : (big ? 0.55 : 0.28)} />);
    }
  };
  rule(-140, 46, 24, 'a', false);
  rule(78, 71, 30, 'b', true);
  /* 대응선 — 같은 양이 두 자에서 다른 칸에 앉는다 */
  out.push(<path key="tie" d="M -54 -78 L -68 78 M 84 -78 L 101 78 M 222 -78 L 243 78"
    fill="none" stroke="#ffffff" strokeOpacity="0.30" strokeWidth={3} />);
  out.push(<circle key="ta" cx={84} cy={-78} r={9} fill="#ffffff" fillOpacity="0.85" />);
  out.push(<circle key="tb" cx={101} cy={78} r={9} fill={to} />);
  return at(out);
}

/** 가상자산 — 봉차트와 목표·손절 선 */
function sceneCrypto(to: string): ReactElement[] {
  /* [몸통 위, 몸통 높이, 심지 위, 심지 아래, 오름] */
  const c: [number, number, number, number, boolean][] = [
    [62, 72, 30, 162, false], [8, 62, -22, 100, true], [-8, 46, -50, 62, false],
    [-72, 82, -112, 42, true], [-102, 52, -142, -18, true], [-152, 62, -192, -58, true],
  ];
  return at([
    /* 목표선과 손절선 */
    <rect key="tp" x={-170} y={-198} width={460} height={3} fill={to} fillOpacity="0.8" />,
    <rect key="sl" x={-170} y={172} width={460} height={3} fill="#ffffff" fillOpacity="0.25" />,
    ...c.flatMap(([top, h, wt, wb, up], i) => {
      const x = -140 + i * 58;
      const f = up ? to : '#ffffff';
      const o = up ? 1 : 0.5;
      return [
        <rect key={`w${i}`} x={x + 13} y={wt} width={4} height={wb - wt} fill={f} fillOpacity={o} />,
        <rect key={`c${i}`} x={x} y={top} width={30} height={h} rx={4} fill={f} fillOpacity={o} />,
      ];
    }),
  ]);
}

/** 갈래 → 장면. 없으면 무늬 + 아이콘으로 돌아간다 */
const SCENE: Record<string, (to: string) => ReactElement[]> = {
  fortune: sceneFortune,
  calculator: sceneCalc,
  test: sceneTest,
  color: sceneColor,
  snap: sceneSnap,
  text: sceneText,
  time: sceneTime,
  image: sceneImage,
  sound: sceneSound,
  game: sceneGame,
  food: sceneFood,
  hanja: sceneHanja,
  quiz: sceneQuiz,
  checklist: sceneChecklist,
  generator: sceneGenerator,
  random: sceneRandom,
  device: sceneDevice,
  convert: sceneConvert,
  crypto: sceneCrypto,
};

let currentScene: ((to: string) => ReactElement[]) | null = null;

let currentConcept: CardConcept = 'orbit';

/** render.ts가 그리기 직전에 부른다 */
export function setCardSection(key: string): void {
  const head = key.split('/')[0];
  currentConcept = CONCEPT_BY_SECTION[head] ?? 'orbit';
  /* 장면은 갈래 «허브»에만 준다 — 낱장까지 주면 백 장이 같은 그림이 된다 */
  currentScene = key === head ? (SCENE[head] ?? null) : null;
}


/* ── 컨셉별 그림 ───────────────────────────────────────────────
   전부 아이콘 자리(ART_X, ART_Y)를 중심으로 그린다. 아이콘은 이 위에 얹히므로
   가운데는 비워 두고 둘레만 짠다. Satori가 받는 것만 쓴다 —
   circle·rect·line·path·g/transform까지다(filter·mask·clipPath는 안 쓴다). */

/** 궤도 — 원래 쓰던 것. 갈래를 못 알아보면 이것으로 돌아간다 */
function artOrbit(to: string): ReactElement[] {
  return [
    <circle key="o1" cx={ART_X} cy={ART_Y} r={240} fill="none" stroke="#ffffff" strokeOpacity="0.13" strokeWidth={2} />,
    <circle key="o2" cx={ART_X} cy={ART_Y} r={300} fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth={2} />,
    <circle key="o3" cx={ART_X} cy={ART_Y - 240} r={8} fill={to} />,
    <circle key="o4" cx={ART_X + 300} cy={ART_Y} r={5} fill="#ffffff" fillOpacity="0.45" />,
  ];
}

/** 모눈 — 계산기·환율·단위. 방안지 위에 값을 적는 자리라는 뜻이다 */
function artGrid(to: string): ReactElement[] {
  const out: ReactElement[] = [];
  const S = 42, N = 9;
  const x0 = ART_X - (N * S) / 2, y0 = ART_Y - (N * S) / 2;
  for (let i = 0; i <= N; i++) {
    const o = i === Math.floor(N / 2) ? 0.20 : 0.055;
    out.push(<rect key={`v${i}`} x={x0 + i * S} y={y0} width={1} height={N * S} fill="#ffffff" fillOpacity={o} />);
    out.push(<rect key={`h${i}`} x={x0} y={y0 + i * S} width={N * S} height={1} fill="#ffffff" fillOpacity={o} />);
  }
  /* 값이 오르는 자리 — 세 칸만 채워 표가 살아 있게 한다 */
  out.push(<rect key="b1" x={x0 + S * 1.15} y={ART_Y + S * 1.2} width={S * 0.7} height={S * 1.6} fill={to} fillOpacity="0.55" />);
  out.push(<rect key="b2" x={x0 + S * 2.15} y={ART_Y + S * 0.2} width={S * 0.7} height={S * 2.6} fill={to} fillOpacity="0.75" />);
  out.push(<rect key="b3" x={x0 + S * 3.15} y={ART_Y - S * 0.8} width={S * 0.7} height={S * 3.6} fill={to} />);
  return out;
}

/** 별자리 — 운세·사주. 점을 선으로 이어 «읽는다»는 뜻을 준다 */
function artStar(to: string): ReactElement[] {
  const pts: [number, number][] = [
    [-210, -140], [-70, -200], [90, -110], [180, 30], [60, 170], [-110, 150], [-230, 30],
  ];
  const out: ReactElement[] = [];
  for (let i = 0; i < pts.length; i++) {
    const [ax, ay] = pts[i];
    const [bx, by] = pts[(i + 1) % pts.length];
    const len = Math.hypot(bx - ax, by - ay);
    const ang = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
    out.push(
      <g key={`l${i}`} transform={`translate(${ART_X + ax} ${ART_Y + ay}) rotate(${ang})`}>
        <rect x={0} y={-0.75} width={len} height={1.5} fill="#ffffff" fillOpacity="0.16" />
      </g>,
    );
  }
  pts.forEach(([x, y], i) => {
    out.push(<circle key={`p${i}`} cx={ART_X + x} cy={ART_Y + y} r={i % 3 === 0 ? 7 : 4} fill={i % 3 === 0 ? to : '#ffffff'} fillOpacity={i % 3 === 0 ? 1 : 0.55} />);
  });
  out.push(<circle key="halo" cx={ART_X} cy={ART_Y} r={252} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth={2} />);
  return out;
}

/** 파문 — 테스트·체크리스트. 답이 퍼져 나가는 모양 */
function artRipple(to: string): ReactElement[] {
  const out: ReactElement[] = [];
  for (let i = 0; i < 6; i++) {
    const r = 120 + i * 42;
    out.push(<circle key={`r${i}`} cx={ART_X - 20} cy={ART_Y + 14} r={r} fill="none" stroke={i % 2 ? '#ffffff' : to}
      strokeOpacity={i % 2 ? 0.07 : 0.22 - i * 0.025} strokeWidth={i % 2 ? 2 : 3} />);
  }
  out.push(<circle key="dot" cx={ART_X - 20} cy={ART_Y + 14 - 288} r={9} fill={to} />);
  return out;
}

/** 띠 — 사진·색·음식. 스펙트럼을 비스듬히 눕힌다 */
function artBand(to: string): ReactElement[] {
  const out: ReactElement[] = [];
  for (let i = 0; i < 7; i++) {
    out.push(
      <g key={`b${i}`} transform={`translate(${ART_X - 300 + i * 74} ${ART_Y}) rotate(24)`}>
        <rect x={-26} y={-300} width={52} height={600} rx={26}
              fill={i % 2 ? '#ffffff' : to} fillOpacity={i % 2 ? 0.05 : 0.13 + (i / 7) * 0.14} />
      </g>,
    );
  }
  return out;
}

/** 격자 점 — 문자·개발. 단말기 화면의 도트 매트릭스 */
function artMono(to: string): ReactElement[] {
  const out: ReactElement[] = [];
  const S = 34, N = 13;
  const x0 = ART_X - ((N - 1) * S) / 2, y0 = ART_Y - ((N - 1) * S) / 2;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const d = Math.hypot(r - (N - 1) / 2, c - (N - 1) / 2);
      if (d > 6.2) continue;
      const lit = (r * 5 + c * 3) % 11 === 0;
      out.push(<circle key={`d${r}-${c}`} cx={x0 + c * S} cy={y0 + r * S} r={lit ? 4 : 2.2}
        fill={lit ? to : '#ffffff'} fillOpacity={lit ? 0.9 : 0.13} />);
    }
  }
  return out;
}

function conceptArt(concept: CardConcept, to: string): ReactElement {
  const parts =
    concept === 'grid' ? artGrid(to)
    : concept === 'star' ? artStar(to)
    : concept === 'ripple' ? artRipple(to)
    : concept === 'band' ? artBand(to)
    : concept === 'mono' ? artMono(to)
    : artOrbit(to);
  return <g>{parts}</g>;
}

function artwork(glyph: ReactElement[] | null, from: string, to: string): ReactElement {
  const half = GLYPH / 2;
  return (
    <svg width={OG_SIZE.width} height={OG_SIZE.height} viewBox="0 0 1200 630">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          {banded([
            [0, GROUND[currentConcept][0]],
            [0.6, GROUND[currentConcept][1]],
            [1, GROUND[currentConcept][2]],
          ])}
        </linearGradient>
        {/* 가로로 밝아지는 판. 왼쪽 끝을 완전 투명으로 둬야 이음선이 안 생긴다 */}
        <linearGradient id="sheet" x1="0" y1="1" x2="1" y2="0">
          {bandedAlpha(from, [[0.3, 0], [1, 0.3]])}
        </linearGradient>
        <radialGradient id="spot" cx="0.5" cy="0.5" r="0.5">
          {bandedAlpha(to, [[0, 0.5], [1, 0]])}
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={1200} height={630} fill="url(#bg)" />
      <rect x={0} y={0} width={1200} height={630} fill="url(#sheet)" />
      <circle cx={ART_X} cy={ART_Y} r={320} fill="url(#spot)" />

      {/* 장면이 있으면 무늬 대신 그린다 — 둘 다 그리면 겹쳐서 지저분하다 */}
      {currentScene ? <g>{currentScene(to)}</g> : conceptArt(currentConcept, to)}

      {glyph && (
        <g
          transform={`translate(${ART_X - half} ${ART_Y - half}) scale(${GLYPH / 100})`}
          fill="none"
          stroke="#ffffff"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {glyph}
        </g>
      )}
    </svg>
  );
}

/**
 * 공유 카드.
 *
 * 왼쪽 글, 오른쪽 그림의 2단 구성이다. 색은 페이지 accent 두 개(from·to)로만
 * 만든다. 800장이 넘는 카드가 같은 형태를 쓰므로 색과 아이콘이 유일한 구분
 * 수단이다.
 *
 * icon에는 사이트 데이터의 이모지를 그대로 넘긴다. 대응하는 그린 아이콘이
 * 있으면 그걸 쓰고, 없으면 이모지를 그대로 얹는다.
 */
export function ogCard({
  icon,
  eyebrow,
  title,
  desc,
  from,
  to,
}: {
  icon: string;
  eyebrow: string;
  title: string;
  desc: string;
  from: string;
  to: string;
}): ReactElement {
  /* 장면이 있는 갈래는 아이콘을 안 그린다 — 장면이 이미 무엇인지 말한다 */
  const glyph = currentScene ? null : ogGlyph(icon, to);
  const headline = stripForCard(title);
  const sub = stripForCard(desc);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0 }}>
        {artwork(glyph, from, to)}
      </div>

      {/* 그린 아이콘이 없는 이모지는 그림 자리에 그대로 얹는다 */}
      {!glyph && !currentScene && (
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: ART_Y - GLYPH / 2,
            left: ART_X - GLYPH / 2,
            width: GLYPH,
            height: GLYPH,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 200,
          }}
        >
          {icon}
        </div>
      )}

      {/* ── 왼쪽: 글 ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: TEXT_BOX + 78,
          height: '100%',
          padding: '66px 0 62px 78px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              width: 8,
              height: 8,
              borderRadius: 999,
              marginRight: 12,
              background: to,
            }}
          />
          {/*
            자간은 라틴·한글에서는 눈에 좋지만 데바나가리에서는 결합 문자를
            흩뜨린다 — 힌디어 카드에서 "चेकलिस्ट"가 "चे क ल सि् ट"로 깨져 나왔다.
            대문자 변환도 그 문자에는 뜻이 없다. 그래서 글자를 보고 정한다.
          */}
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 900, letterSpacing: INDIC.test(eyebrow) ? 0 : '0.2em', color: alpha(readableOnDark(brighter(from, to)), 0.95) }}>
            {INDIC.test(eyebrow) ? eyebrow : eyebrow.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              fontSize: titleSize(headline),
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              marginBottom: 24,
              maxWidth: TEXT_BOX,
              // 없으면 한글이 음절 단위로 잘려 "체크리스 / 트"처럼 끊긴다
              wordBreak: 'keep-all',
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 27,
              lineHeight: 1.45,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 590,
              wordBreak: 'keep-all',
            }}
          >
            {sub}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, fontWeight: 900, color: 'rgba(255,255,255,0.45)' }}>
          vixutil.com
        </div>
      </div>
    </div>
  );
}
