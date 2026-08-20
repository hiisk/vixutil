/**
 * 자녀 예상 키 — 부모 키로 되짚는다.
 *
 * ── 무엇을 계산하나 ────────────────────────────────────────
 * 소아과에서 실제로 쓰는 것은 «중간부모키(mid-parental height)»다. 부모 두
 * 사람의 키를 평균 내되, 아들이면 6.5cm를 더하고 딸이면 6.5cm를 뺀다. 남녀
 * 성인 평균 키 차이가 대략 13cm라 그 절반씩을 옮기는 것이다.
 *
 * ── 왜 범위로 내나 ─────────────────────────────────────────
 * 이 식의 예측 오차는 크다. 실제 성인 키의 약 68%가 중간부모키 ±8.5cm 안에
 * 들어가고, 95%가 ±17cm 안이다. 하나의 수만 내밀면 **그 수가 목표처럼 읽힌다**
 * — 자녀 키는 부모가 가장 조바심 내는 숫자라 더 그렇다. 그래서 값 하나가
 * 아니라 두 구간을 함께 낸다.
 *
 * 유전이 설명하는 몫은 성인 키 변이의 대략 80%이고, 나머지는 영양·수면·질병
 * 같은 것이 가른다. 그 사실도 화면에 적는다.
 */

export type ChildSex = 'boy' | 'girl';

/** 남녀 성인 평균 키 차이의 절반 — 중간부모키에서 더하고 빼는 값 */
const SEX_ADJ = 6.5;

export interface ChildHeightResult {
  /** 중간부모키 — 예측의 중심 */
  mid: number;
  /** 약 68%가 들어가는 구간 (±8.5cm) */
  likelyMin: number;
  likelyMax: number;
  /** 약 95%가 들어가는 구간 (±17cm) */
  wideMin: number;
  wideMax: number;
  /** 부모 평균 키 — 화면에서 계산 과정을 보여줄 때 쓴다 */
  parentAvg: number;
  sex: ChildSex;
  /** 지금 아이의 키를 넣었을 때만: 예측 중심과의 차이 */
  current?: { cm: number; diff: number };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

export function calcChildHeight(
  fatherCm: number,
  motherCm: number,
  sex: ChildSex,
  currentCm?: number,
): ChildHeightResult | null {
  if (!(fatherCm > 0) || !(motherCm > 0)) return null;

  const parentAvg = (fatherCm + motherCm) / 2;
  const mid = parentAvg + (sex === 'boy' ? SEX_ADJ : -SEX_ADJ);

  return {
    mid: r1(mid),
    likelyMin: r1(mid - 8.5),
    likelyMax: r1(mid + 8.5),
    wideMin: r1(mid - 17),
    wideMax: r1(mid + 17),
    parentAvg: r1(parentAvg),
    sex,
    current: currentCm && currentCm > 0
      ? { cm: r1(currentCm), diff: r1(currentCm - mid) }
      : undefined,
  };
}
