/**
 * 무기한 선물 펀딩비 — 롱과 숏이 서로에게 내는 주기적 정산금.
 *
 * 양수면 롱이 숏에게 내고, 음수면 숏이 롱에게 낸다. 표시 단위가 보통 "0.01%"처럼
 * 작아 보이지만 하루에 여러 번, 1년 내내 반복되므로 연환산하면 성격이 완전히 달라진다.
 *
 * ── 대부분의 펀딩비 표가 틀리는 지점 ──────────────────────
 * 연환산할 때 관행적으로 "하루 3회(8시간 주기)"를 가정한다. 그런데 실측(2026-07,
 * 바이낸스 fundingInfo 742종목)으로는
 *     4시간 주기 442종목 / 8시간 296종목 / 1시간 4종목
 * 이다. 즉 **다수가 4시간 주기**다. 8시간이라고 가정하면 이 종목들의 연환산 값이
 * 정확히 절반으로 나온다(하루 3회 vs 6회). 그래서 여기서는 종목별 실제 주기를
 * fundingInfo에서 받아 쓰고, 목록에 없는 종목만 기본값 8시간으로 둔다.
 *
 * 펀딩비는 예측이 아니라 지금 부과되는 비용이다. 다음 정산분은 확정돼 있지만
 * 그 이후는 시장에 따라 바뀌므로, 연환산 값은 "이 수준이 유지된다면"이라는
 * 가정 위에서만 의미가 있다. 화면에도 그렇게 적는다.
 */

/** fundingInfo에 없는 종목의 기본 정산 주기 */
export const DEFAULT_INTERVAL_HOURS = 8;

export interface FundingRow {
  symbol: string;
  /** USDT를 뗀 기초자산 티커 */
  base: string;
  /** 직전 정산 요율 (소수. 0.0001 = 0.01%) */
  rate: number;
  /** 이 종목의 실제 정산 주기(시간) */
  intervalHours: number;
  /** 연환산 요율(%) — 현재 수준이 유지된다는 가정 */
  annualPct: number;
  markPrice: number;
  /** 다음 정산 시각 (epoch ms). 0이면 미제공 */
  nextFundingTime: number;
}

/**
 * 연환산(%) = 요율 × 하루 정산 횟수 × 365.
 * 복리를 적용하지 않는 이유는 펀딩비가 포지션 가치가 아니라 명목가에 부과되고,
 * 실제로는 매 정산마다 현금으로 오가기 때문이다. 단리가 실제 현금흐름에 가깝다.
 */
export function annualizedPct(rate: number, intervalHours: number): number {
  if (!isFinite(rate) || !isFinite(intervalHours) || intervalHours <= 0) return NaN;
  return rate * (24 / intervalHours) * 365 * 100;
}

/**
 * 명목가 notional을 days일 보유할 때 오가는 펀딩비 총액.
 * 양수면 내는 쪽(롱 기준), 음수면 받는 쪽이다.
 * 정산 횟수는 내림한다 — 정산 시점을 지나지 않으면 부과되지 않는다.
 */
export function fundingCost(notional: number, rate: number, intervalHours: number, days: number): number {
  if (!isFinite(notional) || !isFinite(rate) || !isFinite(days) || days < 0) return NaN;
  if (!isFinite(intervalHours) || intervalHours <= 0) return NaN;
  const settlements = Math.floor((days * 24) / intervalHours);
  return notional * rate * settlements;
}

/** premiumIndex 응답 한 건 (문자열로 온다) */
export interface PremiumIndexRaw {
  symbol: string;
  markPrice: string;
  lastFundingRate: string;
  nextFundingTime: number;
}

/** fundingInfo 응답 한 건 */
export interface FundingInfoRaw {
  symbol: string;
  fundingIntervalHours: number;
}

/**
 * premiumIndex와 fundingInfo를 합쳐 USDT 무기한 종목의 행을 만든다.
 * fundingInfo에 없는 종목은 8시간 주기로 둔다(바이낸스 기본값).
 */
export function buildFundingRows(premium: PremiumIndexRaw[], info: FundingInfoRaw[]): FundingRow[] {
  const intervalBySymbol = new Map<string, number>();
  for (const i of info) {
    if (i.fundingIntervalHours > 0) intervalBySymbol.set(i.symbol, i.fundingIntervalHours);
  }

  const rows: FundingRow[] = [];
  for (const p of premium) {
    if (!p.symbol.endsWith('USDT')) continue;
    const rate = Number(p.lastFundingRate);
    const markPrice = Number(p.markPrice);
    if (!isFinite(rate) || !(markPrice > 0)) continue;
    const intervalHours = intervalBySymbol.get(p.symbol) ?? DEFAULT_INTERVAL_HOURS;
    rows.push({
      symbol: p.symbol,
      base: p.symbol.slice(0, -4),
      rate,
      intervalHours,
      annualPct: annualizedPct(rate, intervalHours),
      markPrice,
      nextFundingTime: Number(p.nextFundingTime) || 0,
    });
  }
  return rows;
}

/** 정산 주기별 종목 수 — "대부분 8시간"이라는 통념을 화면에서 반박하기 위한 값 */
export function intervalBreakdown(rows: FundingRow[]): { hours: number; count: number }[] {
  const by = new Map<number, number>();
  for (const r of rows) by.set(r.intervalHours, (by.get(r.intervalHours) ?? 0) + 1);
  return [...by.entries()].map(([hours, count]) => ({ hours, count })).sort((a, b) => a.hours - b.hours);
}

/**
 * 과거 정산 이력에서 현재 요율의 백분위(0~100).
 * "지금이 유별나게 높은가"는 절대값이 아니라 그 종목의 평소 대비로만 답할 수 있다.
 */
export function ratePercentile(history: number[], current: number): number | null {
  if (!history.length) return null;
  let below = 0;
  for (const h of history) if (h < current) below++;
  return (below / history.length) * 100;
}

const FAPI = 'https://fapi.binance.com/fapi/v1';

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json() as Promise<T>;
}

/** 전 종목 현재 펀딩비 + 종목별 정산 주기 */
export async function fetchFunding(): Promise<FundingRow[]> {
  const [premium, info] = await Promise.all([
    getJson<PremiumIndexRaw[]>(`${FAPI}/premiumIndex`),
    // 주기 정보가 없어도 기본값으로 동작하므로 실패해도 계속 간다
    getJson<FundingInfoRaw[]>(`${FAPI}/fundingInfo`).catch(() => [] as FundingInfoRaw[]),
  ]);
  return buildFundingRows(premium, info);
}

/** 한 종목의 과거 정산 요율 (최신순으로 limit개) */
export async function fetchFundingHistory(symbol: string, limit = 500): Promise<number[]> {
  const data = await getJson<Array<{ fundingRate: string }>>(
    `${FAPI}/fundingRate?symbol=${symbol}&limit=${Math.min(limit, 1000)}`,
  );
  return data.map(d => Number(d.fundingRate)).filter(v => isFinite(v));
}
