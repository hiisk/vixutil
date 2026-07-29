/**
 * 김치 프리미엄 — 국내 거래소(업비트·빗썸) 원화 가격과 바이낸스 달러 가격의 괴리.
 *
 * 두 가지 기준을 모두 계산한다. 한쪽만 보여주면 오해를 부른다.
 *
 *  1) FX 기준 (흔히 말하는 "김프")
 *       (국내 KRW가격) / (바이낸스 USD가격 × 공식 USD/KRW 환율) - 1
 *     신문·커뮤니티에서 인용하는 값이다. 다만 공식 환율은 하루 1회 갱신이라
 *     장중에는 고정된 값을 쓰게 된다(아래 fxStale 참조).
 *
 *  2) USDT 기준 (실제 차익거래에 쓰는 값)
 *       (국내 KRW가격) / (바이낸스 USDT가격 × 업비트 KRW-USDT 시세) - 1
 *     원화를 USDT로 바꿔 해외로 보내는 실제 경로를 그대로 반영한다. 국내 USDT
 *     자체에 프리미엄이 붙어 있으면 FX 기준과 크게 갈린다.
 *
 * 실측(2026-07): FX 기준 -1.5%인데 USDT 기준은 0% 근처였다. 차이는 전부
 * 국내 USDT가 공식 환율보다 싸게 거래된 데서 나온다. 그래서 둘 다 보여준다.
 *
 * 김프는 코인마다 균일하지 않다. 대형코인(BTC·ETH·XRP)은 -1.4% 부근에 몰리지만
 * 개별 코인은 국내 수요로 크게 벌어진다. 실측 예: 업비트 BONK가 바이낸스 대비 +48.9%였고
 * 그 가격에 24시간 300억원이 실제로 거래됐다. 반면 같은 코인의 빗썸은 +8.8%였다 —
 * 즉 국내 두 거래소끼리도 37% 벌어질 수 있다.
 * 그래서 (a) 시장 기준선(유동성 상위 코인의 중앙값)을 따로 보여주고
 *        (b) 각 거래소의 원화 거래대금을 함께 노출한다.
 * 얕은 호가에서 나온 큰 숫자와 실제 수요가 만든 큰 숫자는 거래대금으로만 구분된다.
 *
 * ── 티커 충돌 방어 ────────────────────────────────────────
 * 거래소마다 같은 티커에 다른 토큰을 상장한다. 실측 예:
 *   DATA  업비트 "데이터네트워크" vs 바이낸스 Streamr  -> 302배
 *   PROS  업비트 "파로스"        vs 바이낸스 Prosper  -> 8.7배
 *   BEAM  업비트 "빔"           vs 바이낸스 Beam     -> 0.02배
 * 그대로 두면 "김프 +30,086%" 같은 값이 표에 뜬다. 역대 최대 김프가 2018년의 ~50%였으므로
 * 그 범위를 넘으면 프리미엄이 아니라 서로 다른 자산이라고 보는 편이 안전하다.
 * MAX_PLAUSIBLE 밖이면 comparable=false로 두고 표에서 제외한다.
 *
 * 모든 엔드포인트는 CORS 허용 + 키 불필요라 브라우저에서 직접 호출한다(정적 export).
 */

export type Exchange = 'upbit' | 'bithumb';

export interface KimchiRow {
  base: string;
  /** 업비트가 제공하는 한글명. 없으면 티커를 그대로 쓴다. */
  koreanName: string;
  /** 바이낸스 USDT 가격 */
  usd: number;
  /** 바이낸스 24시간 거래대금(USDT) — 정렬·필터용 */
  usdVolume: number;
  /** 거래소별 원화 가격 (미상장이면 null) */
  upbit: number | null;
  bithumb: number | null;
  /** 거래소별 24시간 원화 거래대금 — 큰 김프가 실수요인지 얕은 호가인지 가른다 */
  upbitVolume: number | null;
  bithumbVolume: number | null;
  /** 거래소별 김프(%) — FX 기준 */
  upbitFx: number | null;
  bithumbFx: number | null;
  /** 거래소별 김프(%) — USDT 기준 */
  upbitUsdt: number | null;
  bithumbUsdt: number | null;
  /** 업비트 대비 빗썸 가격차(%). 국내 거래소 간 괴리. */
  spread: number | null;
  /**
   * 같은 자산으로 볼 수 있는가. false면 티커만 같고 다른 토큰일 가능성이 크다
   * (예: 업비트 DATA=데이터네트워크 vs 바이낸스 DATA=Streamr).
   */
  comparable: boolean;
}

/** 어느 데이터 소스가 살아 있는지 — 하나가 죽어도 나머지로 계속 보여주기 위해 추적한다 */
export type SourceId = 'binance' | 'upbit' | 'bithumb' | 'fx';

export interface SourceStatus {
  id: SourceId;
  label: string;
  ok: boolean;
}

/** 계산에 필요한 최소 조건이 무너졌을 때 — 어느 소스가 죽었는지 담아 던진다 */
export class KimchiUnavailableError extends Error {
  // 생성자 파라미터 프로퍼티(public readonly ...)를 쓰면 node --test의 타입 스트리핑이
  // ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX로 죽는다. 평범한 필드로 둔다.
  readonly failed: SourceId[];

  constructor(failed: SourceId[], message: string) {
    super(message);
    this.name = 'KimchiUnavailableError';
    this.failed = failed;
  }
}

export interface KimchiSnapshot {
  rows: KimchiRow[];
  /** 공식 USD/KRW. 환율 소스가 모두 죽으면 null이고, FX 기준을 쓸 수 없다. */
  fxRate: number | null;
  /** 공식 환율 갱신 시각(UTC 문자열) */
  fxUpdated: string | null;
  /** 업비트 KRW-USDT 시세. 업비트가 죽으면 빗썸 USDT로 대체하고, 둘 다 없으면 null. */
  usdtKrw: number | null;
  /** USDT 자체 프리미엄(%) = usdtKrw / fxRate - 1. 둘 중 하나라도 없으면 null. */
  usdtPremium: number | null;
  /** 소스별 생존 여부 — UI가 "무엇이 빠졌는지" 정확히 말할 수 있게 한다 */
  sources: SourceStatus[];
  /** 시장 전체 김프 대표값(BTC 기준, FX) */
  btcFx: number | null;
  btcUsdt: number | null;
  /**
   * 시장 기준선 — 유동성 상위 코인들의 FX 김프 중앙값.
   * 개별 코인이 이 값에서 얼마나 떨어졌는지가 실제로 볼 지점이다.
   */
  marketFx: number | null;
  marketUsdt: number | null;
  /** 티커 충돌로 제외한 코인 수 */
  excluded: number;
  fetchedAt: Date;
}

const UPBIT = 'https://api.upbit.com/v1';
const BITHUMB = 'https://api.bithumb.com/public';
const BINANCE = 'https://data-api.binance.vision/api/v3';
/** 환율은 두 곳을 순서대로 시도한다 — 한쪽이 죽어도 FX 기준을 살리기 위해서다 */
const FX_PRIMARY = 'https://open.er-api.com/v6/latest/USD';
const FX_FALLBACK = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';

/**
 * 이 범위를 벗어나면 김프가 아니라 티커 충돌로 본다.
 * 역대 최대 김프는 2018년의 약 50%였다.
 */
export const MAX_PLAUSIBLE = 60;

/** 스테이블/원화 등가 코인은 김프가 의미 없다 */
const SKIP = new Set(['USDT', 'USDC', 'DAI', 'BUSD', 'TUSD', 'FDUSD', 'USDP', 'PYUSD', 'USD1', 'RLUSD']);

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json() as Promise<T>;
}

/** 업비트 ticker는 markets 파라미터가 길어지면 실패하므로 나눠 부른다 */
async function fetchUpbitTickers(markets: string[]): Promise<Map<string, { price: number; vol: number }>> {
  const out = new Map<string, { price: number; vol: number }>();
  const CHUNK = 100;
  for (let i = 0; i < markets.length; i += CHUNK) {
    const slice = markets.slice(i, i + CHUNK);
    try {
      const data = await getJson<Array<{ market: string; trade_price: number; acc_trade_price_24h: number }>>(
        `${UPBIT}/ticker?markets=${slice.join(',')}`,
      );
      for (const t of data) out.set(t.market.slice(4), { price: t.trade_price, vol: t.acc_trade_price_24h ?? 0 });
    } catch {
      // 한 덩어리가 실패해도 나머지는 살린다
    }
  }
  return out;
}

/** 환율 — 1차가 죽으면 2차를 쓴다. 둘 다 죽으면 null(=FX 기준 사용 불가). */
async function fetchFx(): Promise<{ rate: number; updated: string } | null> {
  try {
    const r = await getJson<{ rates: Record<string, number>; time_last_update_utc: string }>(FX_PRIMARY);
    if (r.rates?.KRW > 0) return { rate: r.rates.KRW, updated: r.time_last_update_utc };
  } catch {
    // 2차로 넘어간다
  }
  try {
    const r = await getJson<{ date: string; usd: Record<string, number> }>(FX_FALLBACK);
    if (r.usd?.krw > 0) return { rate: r.usd.krw, updated: r.date };
  } catch {
    // 둘 다 실패
  }
  return null;
}

/**
 * 네 소스를 각각 독립적으로 받는다. 예전에는 Promise.all이라 하나만 죽어도 페이지 전체가
 * 빈 화면이 됐다 — 실제로 그렇게 죽었다. 이제는 살아 있는 것만으로 계산하고, 무엇이 빠졌는지
 * snapshot.sources에 담아 UI가 정확히 말할 수 있게 한다.
 *
 * 최소 조건은 두 가지뿐이다.
 *   (1) 바이낸스 — 비교 기준인 달러 가격이라 대체재가 없다.
 *   (2) 국내 거래소 최소 한 곳 + 환산 기준(환율 또는 USDT 시세) 최소 하나.
 * 이 조건이 무너질 때만 throw 한다.
 */
export async function fetchKimchi(): Promise<KimchiSnapshot> {
  const [binanceR, upbitMarketsR, bithumbR, fxR] = await Promise.allSettled([
    getJson<Array<Record<string, string>>>(`${BINANCE}/ticker/24hr`),
    getJson<Array<{ market: string; korean_name: string }>>(`${UPBIT}/market/all`),
    getJson<{ status: string; data: Record<string, Record<string, string> | string> }>(`${BITHUMB}/ticker/ALL_KRW`),
    fetchFx(),
  ]);

  // 바이낸스 USDT 가격 — 없으면 아무것도 계산할 수 없다
  const usd = new Map<string, { price: number; vol: number }>();
  if (binanceR.status === 'fulfilled') {
    for (const t of binanceR.value) {
      if (!t.symbol.endsWith('USDT')) continue;
      const base = t.symbol.slice(0, -4);
      const price = Number(t.lastPrice);
      if (price > 0) usd.set(base, { price, vol: Number(t.quoteVolume) || 0 });
    }
  }
  if (usd.size === 0) {
    throw new KimchiUnavailableError(['binance'], '바이낸스 시세를 받지 못했습니다');
  }

  // 업비트 — 마켓 목록과 시세를 모두 받아야 쓸 수 있다
  const nameByBase = new Map<string, string>();
  let upbit = new Map<string, { price: number; vol: number }>();
  if (upbitMarketsR.status === 'fulfilled') {
    const krwList = upbitMarketsR.value.filter(m => m.market.startsWith('KRW-'));
    for (const m of krwList) nameByBase.set(m.market.slice(4), m.korean_name);
    upbit = await fetchUpbitTickers(krwList.map(m => m.market));
  }

  // 빗썸
  const bithumb = new Map<string, { price: number; vol: number }>();
  if (bithumbR.status === 'fulfilled') {
    for (const [base, v] of Object.entries(bithumbR.value.data ?? {})) {
      if (base === 'date' || typeof v === 'string') continue;
      const price = Number(v.closing_price);
      if (price > 0) bithumb.set(base, { price, vol: Number(v.acc_trade_value_24H) || 0 });
    }
  }

  const fx = fxR.status === 'fulfilled' ? fxR.value : null;
  const fxRate = fx?.rate ?? null;

  // USDT 원화 시세 — 업비트가 먼저지만, 죽었으면 빗썸 USDT로 대체한다
  const usdtKrw = upbit.get('USDT')?.price ?? bithumb.get('USDT')?.price ?? null;

  const sources: SourceStatus[] = [
    { id: 'binance', label: '바이낸스', ok: true },
    { id: 'upbit', label: '업비트', ok: upbit.size > 0 },
    { id: 'bithumb', label: '빗썸', ok: bithumb.size > 0 },
    { id: 'fx', label: '환율', ok: fxRate != null },
  ];
  const failed = sources.filter(s => !s.ok).map(s => s.id);

  if (upbit.size === 0 && bithumb.size === 0) {
    throw new KimchiUnavailableError(failed, '업비트·빗썸 시세를 모두 받지 못했습니다');
  }
  if (fxRate == null && usdtKrw == null) {
    throw new KimchiUnavailableError(failed, '환율과 USDT 시세를 모두 받지 못해 환산할 수 없습니다');
  }

  const bases = new Set<string>([...upbit.keys(), ...bithumb.keys()]);
  const rows: KimchiRow[] = [];
  for (const base of bases) {
    if (SKIP.has(base)) continue;
    const u = usd.get(base);
    if (!u) continue; // 바이낸스에 없으면 비교 대상이 없다

    const upRec = upbit.get(base);
    const btRec = bithumb.get(base);
    const up = upRec?.price ?? null;
    const bt = btRec?.price ?? null;
    // 환산 기준(ref)이 없으면 그 기준의 김프는 계산할 수 없다 — null로 둔다
    const prem = (krw: number | null, ref: number | null) =>
      krw != null && ref != null && ref > 0 ? (krw / (u.price * ref) - 1) * 100 : null;

    rows.push({
      base,
      koreanName: nameByBase.get(base) ?? base,
      usd: u.price,
      usdVolume: u.vol,
      upbit: up,
      bithumb: bt,
      upbitVolume: upRec?.vol ?? null,
      bithumbVolume: btRec?.vol ?? null,
      upbitFx: prem(up, fxRate),
      bithumbFx: prem(bt, fxRate),
      upbitUsdt: prem(up, usdtKrw),
      bithumbUsdt: prem(bt, usdtKrw),
      spread: up != null && bt != null && up > 0 ? (bt / up - 1) * 100 : null,
      // 티커 충돌 판정 — FX 기준이 있으면 그걸로, 없으면 USDT 기준으로 잰다.
      // 기준이 하나도 없으면 애초에 여기 오지 않는다(위에서 throw).
      comparable: (fxRate != null
        ? [prem(up, fxRate), prem(bt, fxRate)]
        : [prem(up, usdtKrw), prem(bt, usdtKrw)]
      )
        .filter((v): v is number => v != null)
        .every(v => Math.abs(v) <= MAX_PLAUSIBLE),
    });
  }

  rows.sort((a, b) => b.usdVolume - a.usdVolume);
  const usable = rows.filter(r => r.comparable);
  const btc = usable.find(r => r.base === 'BTC');

  // 시장 기준선: 유동성 상위 20개의 중앙값. 평균이 아니라 중앙값을 쓰는 이유는
  // BONK처럼 한 코인이 +48%를 찍으면 평균이 통째로 끌려가기 때문이다.
  const median = (a: number[]) => {
    if (!a.length) return null;
    const s = [...a].sort((x, y) => x - y);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  };
  const top = usable.slice(0, 20);
  const marketFx = median(top.map(r => r.upbitFx ?? r.bithumbFx).filter((v): v is number => v != null));
  const marketUsdt = median(top.map(r => r.upbitUsdt ?? r.bithumbUsdt).filter((v): v is number => v != null));

  return {
    rows: usable,
    fxRate,
    fxUpdated: fx?.updated ?? null,
    usdtKrw,
    usdtPremium: fxRate != null && usdtKrw != null ? (usdtKrw / fxRate - 1) * 100 : null,
    sources,
    btcFx: btc?.upbitFx ?? btc?.bithumbFx ?? null,
    btcUsdt: btc?.upbitUsdt ?? btc?.bithumbUsdt ?? null,
    marketFx,
    marketUsdt,
    excluded: rows.length - usable.length,
    fetchedAt: new Date(),
  };
}

/** 김프 값에 따른 색 등급 — 0 근처는 중립, 크게 벌어지면 강조 */
export function premiumTone(v: number | null): 'high' | 'up' | 'flat' | 'down' | 'low' | 'none' {
  if (v == null || !isFinite(v)) return 'none';
  if (v >= 3) return 'high';
  if (v >= 0.5) return 'up';
  if (v > -0.5) return 'flat';
  if (v > -3) return 'down';
  return 'low';
}
