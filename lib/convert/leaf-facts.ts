/**
 * 값 낱장 한 장에 들어가는 값들 — 쌍 하나와 숫자 하나에서 전부 계산된다.
 *
 * ── 왜 계산을 여기 두는가 ────────────────────────────────────
 * 값 낱장은 33,120장이다. **같은 문장에 숫자만 바뀌면 색인이 안 되고 사이트
 * 전체 평가를 깎는다.** 그래서 한 장을 이루는 네 덩이가 값에 따라 실제로 달라야
 * 하고, "달라진다"를 검사가 확인할 수 있어야 한다 — 화면에 있으면 못 부른다.
 *
 * ── 네 덩이 ──────────────────────────────────────────────────
 *   1. 역방향      70kg는 154lb인데, 그럼 70lb는 몇 kg인가 (사람이 같이 친다)
 *   2. 주변값 표   그 값을 둘러싼 눈금 20줄. 눈금 폭이 값의 자릿수를 따라간다
 *   3. 어림과 왕복 반올림했을 때의 오차와, 되돌렸을 때 제자리로 오는지
 *   4. 같은 값 다른 단위 · 이웃 값 링크
 *
 * 셋째가 특히 값마다 다르다 — 70kg는 154.324lb라 154로 어림해도 0.2% 안이지만,
 * 1kg는 2.205lb라 2로 어림하면 9%가 틀린다. **어림이 언제 괜찮은지는 값이 정한다.**
 */
import { CONVERT_TOOLS, type ConvertTool } from '../convert-tools.ts';
import { convertValue, invertValue, neighborValues, valuesFor } from './values.ts';

/** 자릿수에 맞춰 자른다 — 부동소수 찌꺼기(0.30000000000000004)를 없앤다 */
export const round = (n: number, digits: number): number => {
  const p = 10 ** digits;
  return Math.round(n * p) / p;
};

/** 소수 자릿수 — 눈금과 기준값 가운데 잔 쪽에 맞춘다 */
const decimals = (n: number): number => {
  const s = String(n);
  const i = s.indexOf('.');
  return i < 0 ? 0 : s.length - i - 1;
};

/**
 * 주변값 표의 눈금 폭 — **v/10 이하의 가장 큰 어림수**(1·2·5 × 10ⁿ).
 *
 * 스무 줄이 값의 두 배쯤을 덮게 하려면 눈금이 v/10 언저리여야 한다. 거기서
 * 1·2·5로 내림하는 것은 사람이 표를 눈으로 훑을 때 걸리는 수가 그 셋이기 때문이다
 * (7이나 3 눈금으로 된 표는 읽히지 않는다).
 *
 *   1 → 0.1 · 5.5 → 0.5 · 70 → 5 · 1000 → 100
 *
 * 고정 폭으로 두면 1 근처에서는 표가 쓸모없이 성기고 1000 근처에서는 스무 줄이
 * 다 붙어 버린다. 처음에 10ⁿ만 쓰다가 1000에서 눈금이 500이 되어 검사가 잡았다.
 */
export function tableStep(v: number): number {
  const x = Math.abs(v) / 10 || 0.1;
  const m = 10 ** Math.floor(Math.log10(x));
  for (const k of [5, 2, 1]) if (k * m <= x + Number.EPSILON) return k * m;
  return m;
}

/**
 * 주변값 스무 줄.
 *
 * **그 값 자체가 반드시 표에 있어야 한다** — 없으면 "이 페이지가 말하는 값"이
 * 표에서 빠져 읽는 사람이 자기 줄을 못 찾는다. 그래서 v를 기준으로 앞뒤로 흘리고,
 * 0 아래는 버린 뒤 모자란 만큼 위로 채운다.
 *
 * 자릿수를 눈금에만 맞추면 **기준값이 반올림에 밀려 표에서 사라진다** —
 * 페이스 5.25가 눈금 0.5에서 5.3이 되어 검사가 잡았다. 둘 중 잔 쪽에 맞춘다.
 */
export function tableRows(v: number, count = 20): number[] {
  const step = tableStep(v);
  const digits = Math.max(decimals(step), decimals(v));
  const rows: number[] = [];
  for (let k = -9; rows.length < count; k++) {
    const x = round(v + k * step, digits);
    if (x > 0) rows.push(x);
    if (k > 400) break;   // 안전장치 — 눈금이 0이면 무한 반복이 된다
  }
  return rows;
}

export interface LeafFacts {
  /** 그 값의 변환 결과 */
  result: number;
  /** 거꾸로 — 같은 숫자를 반대 단위에서 읽으면 */
  inverse: number;
  /** 결과를 정수로 어림한 값 */
  rounded: number;
  /** 어림했을 때 몇 % 틀리는가 */
  roundedError: number;
  /** 어림값을 되돌리면 원래 값에서 얼마나 벗어나는가 */
  roundTrip: number;
  /** 주변값 표 — [원래값, 변환값] 스무 줄 */
  table: [number, number][];
  /** 같은 값을 같은 갈래의 다른 쌍으로 — 슬러그와 결과 */
  otherPairs: { slug: string; title: string; from: string; to: string; result: number }[];
  /** 이웃 값 — 같은 쌍의 다른 대표값 */
  neighbors: number[];
}

/**
 * 낱장 하나의 값 전부.
 *
 * otherPairs는 **같은 왼쪽 단위를 쓰는 다른 쌍**이다(kg-lb의 이웃은 kg-g·kg-oz).
 * 같은 갈래 전체로 넓히면 cm-inch 옆에 m-feet가 붙어 값이 안 맞는다 —
 * 70cm와 70m는 다른 이야기다. 왼쪽 단위가 같아야 "같은 70"이 된다.
 */
export function leafFacts(tool: ConvertTool, v: number): LeafFacts {
  const result = round(convertValue(tool, v), tool.digits);
  const inverse = round(invertValue(tool, v), tool.digits);
  const rounded = Math.round(result);
  const roundedError = result === 0 ? 0 : round(Math.abs((rounded - result) / result) * 100, 3);
  const roundTrip = round(invertValue(tool, rounded), tool.digits);

  const table = tableRows(v).map(x => [x, round(convertValue(tool, x), tool.digits)] as [number, number]);

  const otherPairs = CONVERT_TOOLS
    .filter(t => t.slug !== tool.slug && t.from === tool.from)
    .slice(0, 6)
    .map(t => ({ slug: t.slug, title: t.title, from: t.from, to: t.to, result: round(convertValue(t, v), t.digits) }));

  return { result, inverse, rounded, roundedError, roundTrip, table, otherPairs, neighbors: neighborValues(tool.slug, v) };
}

/**
 * 어림이 쓸 만한가 — 화면 문장이 이것으로 갈린다.
 *
 * 0.5% 안이면 "그냥 정수로 말해도 된다", 아니면 "어림하면 이만큼 어긋난다"를
 * 적는다. **값마다 답이 다르다** — 70kg는 154로 말해도 되고 1kg는 2라고 하면 안 된다.
 */
export const roundingIsSafe = (f: LeafFacts): boolean => f.roundedError < 0.5;

/** 그 쌍에 실제로 존재하는 값인지 — 낱장을 낼지 404를 낼지 정한다 */
export const hasValue = (slug: string, v: number): boolean => valuesFor(slug).includes(v);
