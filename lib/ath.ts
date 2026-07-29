/**
 * 전고점(ATH) — "언제 다시 전고점을 찍나"는 예측 페이지에서 가장 자주 나오는 질문이다.
 *
 * 여기서 말하는 전고점은 **바이낸스 상장 이후 일별 종가 기준**이다. 실제 역사적 최고가와
 * 다를 수 있는 이유가 둘 있다.
 *   (1) 장중 고가가 아니라 종가를 쓴다 — 이 사이트의 모든 모델이 일별 종가 모델이라
 *       기준을 섞으면 확률과 가격이 서로 다른 세계를 말하게 된다.
 *   (2) 바이낸스 상장 전 가격은 데이터에 없다. 상장이 늦은 코인일수록 실제 전고점이
 *       더 위에 있을 수 있다.
 * 둘 다 화면에 밝힌다. "역대 최고가"라고 뭉뚱그리면 틀린 말이 된다.
 *
 * 회복 확률은 lib/barriers의 경로 시뮬레이션을 그대로 쓴다 — 예측 페이지의 밴드와 같은
 * 분포에서 나오므로 두 숫자가 서로 모순되지 않는다.
 */

export interface AthInfo {
  /** 일별 종가 기준 최고가 */
  ath: number;
  /** 그 최고가가 나온 위치 (배열 인덱스) */
  atIndex: number;
  /** 최고가 이후 지난 일수 */
  daysSince: number;
  /** 현재가가 전고점 대비 몇 % 인가 (100이면 전고점) */
  pctOfAth: number;
  /** 전고점 대비 하락률(%) — 양수로 표현한다 */
  drawdownPct: number;
  /** 전고점 회복에 필요한 상승률(%) */
  gainToRecoverPct: number;
  /** 현재가가 곧 전고점인가 (오차 0.1% 이내) */
  atHigh: boolean;
}

/**
 * 종가 배열과 현재가에서 전고점 정보를 만든다.
 * 현재가가 과거 최고 종가보다 높으면 현재가가 전고점이다.
 */
export function athInfo(closes: number[], spot: number): AthInfo | null {
  if (!closes.length || !(spot > 0)) return null;

  let ath = -Infinity;
  let atIndex = -1;
  for (let i = 0; i < closes.length; i++) {
    const c = closes[i];
    if (isFinite(c) && c > ath) { ath = c; atIndex = i; }
  }
  if (!(ath > 0)) return null;

  // 지금이 신고가면 현재가가 전고점이다
  if (spot > ath) {
    ath = spot;
    atIndex = closes.length;
  }

  const daysSince = Math.max(0, closes.length - atIndex);
  const pctOfAth = (spot / ath) * 100;
  const drawdownPct = Math.max(0, (1 - spot / ath) * 100);
  // 반토막이면 100%가 올라야 돌아온다 — 하락률과 대칭이 아니다
  const gainToRecoverPct = spot > 0 ? Math.max(0, (ath / spot - 1) * 100) : 0;

  return {
    ath,
    atIndex,
    daysSince,
    pctOfAth,
    drawdownPct,
    gainToRecoverPct,
    atHigh: drawdownPct < 0.1,
  };
}

/**
 * 하락률에서 회복에 필요한 상승률로 바꾼다.
 * −50%는 +100%가 필요하고 −80%는 +400%가 필요하다. 이 비대칭이 사람들이
 * 가장 자주 틀리는 지점이라 별도 함수로 두고 테스트한다.
 */
export function recoveryGainPct(drawdownPct: number): number | null {
  if (!isFinite(drawdownPct) || drawdownPct < 0 || drawdownPct >= 100) return null;
  const remaining = 1 - drawdownPct / 100;
  return (1 / remaining - 1) * 100;
}
