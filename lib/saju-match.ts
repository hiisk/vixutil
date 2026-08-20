import {
  BRANCHES, BRANCH_ELEMENTS, STEMS, STEM_ELEMENTS,
  buildChart, countElements, getSipseong, SAMHAP,
  type Birth, type Chart, type Element, type Pillar,
} from './saju-data.ts';
import { josa } from './hangul.ts';

/**
 * 사주 궁합 — 두 사람의 명식을 견준다.
 *
 * ── 왜 필요한가 ────────────────────────────────────────────
 * 궁합 도구가 다섯(띠·별자리·혈액형·이름·MBTI)인데 **정작 사주 궁합이 없었다.**
 * 그 갈래에서 사람이 제일 많이 치는 말이 그것이다.
 *
 * ── 무엇을 보는가 ──────────────────────────────────────────
 * 명리에서 두 사람을 볼 때 실제로 짚는 자리는 넷이다.
 *
 *   1) **일간끼리의 관계** — 두 사람의 «자기 자신»이 서로를 돕는가 치는가.
 *      상생이면 편하고, 상극이면 부딪히되 서로를 다듬는다. 같으면 닮아서
 *      편한 대신 같은 것이 부족하다.
 *   2) **일지(배우자궁)의 합·충** — 여기가 가장 가까운 자리다. 육합이면
 *      끌리고, 충이면 부딪힌다. 삼합은 함께 무언가를 이룬다.
 *   3) **오행의 보완** — 한쪽에 없는 오행을 다른 쪽이 갖고 있으면 채워 준다.
 *      궁합에서 «맞는다»는 대개 이 뜻이다.
 *   4) **십성 관계** — 상대의 일간이 내 사주에서 무엇이 되는가. 정관·정재는
 *      안정, 편관·편재는 자극, 비겁은 동료에 가깝다.
 *
 * ── 점수를 내되 뜻을 함께 낸다 ─────────────────────────────
 * 점수 하나만 내밀면 「67점」이 무슨 뜻인지 아무도 모른다. 네 자리를 각각
 * 점수와 한 줄로 내고, 총점은 그 넷의 가중합이다. 어디서 깎였는지 보인다.
 */

/** 지지 육합 — 서로 끌어당기는 짝 */
const YUKHAP: [number, number][] = [
  [0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7],
];
/** 지지 충 — 정면으로 부딪히는 짝(여섯 쌍, 6칸 차이) */
const isChung = (a: number, b: number) => Math.abs(a - b) === 6;

/** 오행 상생 고리: 목→화→토→금→수→목 */
const SAENG: Record<Element, Element> = { 목: '화', 화: '토', 토: '금', 금: '수', 수: '목' };
/** 오행 상극: 목→토→수→화→금→목 */
const GEUK: Record<Element, Element> = { 목: '토', 토: '수', 수: '화', 화: '금', 금: '목' };

const ELEMENTS: Element[] = ['목', '화', '토', '금', '수'];

export type MatchAxis = 'ilgan' | 'ilji' | 'ohaeng' | 'sipseong';

export interface AxisResult {
  id: MatchAxis;
  /** 0~5 */
  score: number;
  /** 그 자리에서 실제로 무엇이 걸렸는지 — 화면에 그대로 낸다 */
  note: string;
}

export interface SajuMatchResult {
  a: Chart;
  b: Chart;
  axes: AxisResult[];
  /** 0~100 */
  total: number;
  /** 한쪽에 없고 다른 쪽에 있는 오행 — 채워 주는 것 */
  aFills: Element[];
  bFills: Element[];
  /** 둘 다 없는 오행 — 함께 비어 있는 자리 */
  bothMissing: Element[];
}

function iljanRelation(aStem: number, bStem: number): AxisResult {
  const ea = STEM_ELEMENTS[aStem];
  const eb = STEM_ELEMENTS[bStem];
  const aName = STEMS[aStem].kor;
  const bName = STEMS[bStem].kor;

  if (aStem === bStem) {
    return { id: 'ilgan', score: 3,
      note: `두 사람의 일간이 ${aName}(${ea})으로 같습니다. 서로를 설명하지 않아도 아는 편안함이 있지만, 부족한 것도 같아 둘 다 약한 자리를 메워 줄 사람이 없습니다.` };
  }
  if (ea === eb) {
    return { id: 'ilgan', score: 4,
      note: `일간이 ${aName}·${bName}으로 다르지만 같은 ${ea} 기운입니다. 결이 비슷해 말이 잘 통하고, 음양이 갈려 같은 오행이어도 서로를 밀어 줍니다.` };
  }
  if (SAENG[ea] === eb) {
    return { id: 'ilgan', score: 5,
      note: `${aName}(${ea})이 ${bName}(${eb})을 낳는 상생입니다. 첫 번째 사람이 두 번째 사람을 밀어 주는 방향이라, 주고받는 흐름이 한쪽으로 자연스럽게 섭니다.` };
  }
  if (SAENG[eb] === ea) {
    return { id: 'ilgan', score: 5,
      note: `${bName}(${eb})이 ${aName}(${ea})을 낳는 상생입니다. 두 번째 사람이 첫 번째 사람을 받쳐 주는 방향입니다.` };
  }
  if (GEUK[ea] === eb || GEUK[eb] === ea) {
    return { id: 'ilgan', score: 2,
      note: `${aName}(${ea})과 ${bName}(${eb})이 서로 극하는 관계입니다. 가까울수록 부딪히지만, 명리에서 상극은 «나쁘다»가 아니라 «다듬는다»로 봅니다 — 서로의 지나친 데를 깎아 주는 짝입니다.` };
  }
  return { id: 'ilgan', score: 3, note: `일간이 ${aName}(${ea})과 ${bName}(${eb})으로, 돕지도 치지도 않는 사이입니다.` };
}

function iljiRelation(aBranch: number, bBranch: number): AxisResult {
  const an = BRANCHES[aBranch].kor;
  const bn = BRANCHES[bBranch].kor;

  if (YUKHAP.some(([x, y]) => (x === aBranch && y === bBranch) || (y === aBranch && x === bBranch))) {
    return { id: 'ilji', score: 5,
      note: `배우자궁이 ${an}·${bn}으로 육합(六合)입니다. 명리에서 두 사람을 볼 때 가장 좋게 치는 짝으로, 서로에게 끌리고 곁에 있는 것이 편안합니다.` };
  }
  if (SAMHAP.some(g => g.includes(aBranch) && g.includes(bBranch) && aBranch !== bBranch)) {
    return { id: 'ilji', score: 4,
      note: `배우자궁 ${an}·${bn}이 삼합(三合)의 일부입니다. 함께 무언가를 이루는 데 잘 맞는 짝으로, 연애보다 «같이 하는 일»에서 힘이 납니다.` };
  }
  if (isChung(aBranch, bBranch)) {
    return { id: 'ilji', score: 1,
      note: `배우자궁이 ${an}·${bn}으로 충(沖)입니다. 가장 가까운 자리끼리 정면으로 부딪히는 구조라, 사소한 일에서 자주 어긋납니다. 다만 충은 «변화»의 자리이기도 해서, 서로 떨어져 지내는 시간이 있는 관계에서는 오히려 덜 걸립니다.` };
  }
  if (aBranch === bBranch) {
    return { id: 'ilji', score: 3,
      note: `배우자궁이 ${an}으로 같습니다. 생활 방식이 닮아 부딪힘이 적지만, 같은 것을 좋아하고 같은 것을 싫어해서 관계가 한쪽으로 치우치기 쉽습니다.` };
  }
  return { id: 'ilji', score: 3, note: `배우자궁이 ${an}·${bn}으로, 합도 충도 아닙니다. 이 자리에서는 특별히 끌리지도 부딪히지도 않습니다.` };
}

function ohaengRelation(
  ca: Record<Element, number>, cb: Record<Element, number>,
): { axis: AxisResult; aFills: Element[]; bFills: Element[]; bothMissing: Element[] } {
  const aMissing = ELEMENTS.filter(e => (ca[e] ?? 0) === 0);
  const bMissing = ELEMENTS.filter(e => (cb[e] ?? 0) === 0);
  /* 내가 없는 것을 상대가 갖고 있으면 «채워 준다» */
  const bFills = aMissing.filter(e => (cb[e] ?? 0) > 0);
  const aFills = bMissing.filter(e => (ca[e] ?? 0) > 0);
  const bothMissing = aMissing.filter(e => bMissing.includes(e));

  const filled = aFills.length + bFills.length;
  const score = bothMissing.length >= 2 ? 2
    : filled >= 3 ? 5
    : filled === 2 ? 4
    : filled === 1 ? 3
    : aMissing.length === 0 && bMissing.length === 0 ? 4
    : 3;

  const parts: string[] = [];
  /* 조사는 앞 낱말의 받침이 정한다 — 「금·수을」이 나왔던 자리다 */
  if (bFills.length) {
    const w = bFills.join('·');
    parts.push(`두 번째 사람이 첫 번째 사람에게 없는 ${w}${josa(w, '을')} 갖고 있습니다`);
  }
  if (aFills.length) {
    const w = aFills.join('·');
    parts.push(`첫 번째 사람이 두 번째 사람에게 없는 ${w}${josa(w, '을')} 갖고 있습니다`);
  }
  if (bothMissing.length) {
    const w = bothMissing.join('·');
    parts.push(`다만 ${w}${josa(w, '은')} 둘 다 비어 있어 서로 메워 줄 수 없습니다`);
  }
  if (!parts.length) parts.push('두 사람 다 다섯 오행이 고르게 있어 특별히 메울 자리가 없습니다');

  return {
    axis: { id: 'ohaeng', score, note: parts.join('. ') + '.' },
    aFills, bFills, bothMissing,
  };
}

/** 십성 — 상대의 일간이 내 사주에서 무엇이 되는가 */
const SIPSEONG_TONE: Record<string, { score: number; note: string }> = {
  정관: { score: 5, note: '상대가 나에게 «정관»이 됩니다. 규범과 신뢰를 뜻하는 자리라, 오래 가는 관계에서 가장 좋게 봅니다.' },
  정재: { score: 5, note: '상대가 나에게 «정재»가 됩니다. 안정된 살림과 현실을 뜻하는 자리로, 함께 사는 데 잘 맞습니다.' },
  정인: { score: 4, note: '상대가 나에게 «정인»이 됩니다. 나를 돌보고 받쳐 주는 자리라 편안하지만, 기대는 쪽이 한쪽으로 쏠릴 수 있습니다.' },
  식신: { score: 4, note: '상대가 나에게 «식신»이 됩니다. 함께 있으면 표현이 늘고 즐거운 자리입니다.' },
  편재: { score: 3, note: '상대가 나에게 «편재»가 됩니다. 끌림이 크고 재미있지만 오래 붙들기는 어려운 결입니다.' },
  편관: { score: 3, note: '상대가 나에게 «편관»이 됩니다. 자극이 크고 긴장이 있는 관계로, 서로를 밀어붙이는 만큼 지치기도 합니다.' },
  편인: { score: 3, note: '상대가 나에게 «편인»이 됩니다. 생각이 깊어지는 자리지만 거리를 두게 되기도 합니다.' },
  상관: { score: 2, note: '상대가 나에게 «상관»이 됩니다. 하고 싶은 말이 많아지는 자리라 부딪힘이 잦습니다.' },
  비견: { score: 3, note: '상대가 나에게 «비견»이 됩니다. 동료에 가까운 사이로, 편한 대신 설렘은 적습니다.' },
  겁재: { score: 2, note: '상대가 나에게 «겁재»가 됩니다. 서로 가진 것을 나누는 자리라 돈·시간에서 부딪히기 쉽습니다.' },
};

/**
 * 총점을 말과 색으로 옮긴다.
 *
 * 점수 하나만 내밀면 「72점」이 무슨 뜻인지 아무도 모른다. 색은 두 테마의
 * 결과판 바탕(흰색·slate-900) 양쪽에서 대형 글자 기준(3.0)을 넘겨야 한다 —
 * 처음 골랐던 #ca8a04는 흰 바탕에서 2.94였다. tests/saju-match.test.ts가 잰다.
 */
export const MATCH_GRADES = [
  { min: 85, label: '아주 잘 맞습니다', color: '#15803d' },
  { min: 70, label: '좋은 궁합입니다', color: '#0d9488' },
  { min: 55, label: '무난한 궁합입니다', color: '#0284c7' },
  { min: 40, label: '노력이 필요한 궁합', color: '#b45309' },
  { min: 0, label: '부딪힘이 많은 궁합', color: '#dc2626' },
] as const;

export const matchGrade = (total: number) =>
  MATCH_GRADES.find(g => total >= g.min) ?? MATCH_GRADES[MATCH_GRADES.length - 1];

export function matchSaju(
  aBirth: Birth, aGender: 'male' | 'female',
  bBirth: Birth, bGender: 'male' | 'female',
): SajuMatchResult | null {
  const a = buildChart(aBirth, aGender);
  const b = buildChart(bBirth, bGender);
  if (!a || !b) return null;

  const pillarsOf = (c: Chart): (Pillar | null)[] => [c.year, c.month, c.day, c.hour];
  const ca = countElements(pillarsOf(a));
  const cb = countElements(pillarsOf(b));

  const ilgan = iljanRelation(a.day.stemIdx, b.day.stemIdx);
  const ilji = iljiRelation(a.day.branchIdx, b.day.branchIdx);
  const oh = ohaengRelation(ca, cb);

  /* 상대의 일간이 «첫 번째 사람의» 사주에서 무엇이 되는가 */
  const ss = getSipseong(a.day.stemIdx, b.day.stemIdx);
  const tone = SIPSEONG_TONE[ss] ?? { score: 3, note: `상대가 나에게 «${ss}»${josa(ss, '이')} 됩니다.` };
  const sipseong: AxisResult = { id: 'sipseong', score: tone.score, note: tone.note };

  const axes = [ilgan, ilji, oh.axis, sipseong];
  /* 일지(가장 가까운 자리)를 제일 무겁게, 십성을 제일 가볍게 */
  const W: Record<MatchAxis, number> = { ilgan: 0.28, ilji: 0.34, ohaeng: 0.24, sipseong: 0.14 };
  const total = Math.round(axes.reduce((s, x) => s + (x.score / 5) * W[x.id] * 100, 0));

  return { a, b, axes, total, aFills: oh.aFills, bFills: oh.bFills, bothMissing: oh.bothMissing };
}

/** 지지의 오행 — 화면에서 점을 찍을 때 쓴다 */
export const branchElement = (idx: number): Element => BRANCH_ELEMENTS[idx];
