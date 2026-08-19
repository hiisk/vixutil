'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchKimchi, premiumTone, KimchiUnavailableError, type KimchiSnapshot, type KimchiRow } from '@/lib/kimchi';
import { CoinLogo } from '@/components/crypto/ui';

type State = 'loading' | 'ready' | 'error';
type Basis = 'fx' | 'usdt';
type SortKey = 'volume' | 'premium' | 'spread';

/** 프리미엄 값 색상 — 색만으로 방향을 전달하지 않도록 부호도 항상 함께 쓴다 */
const TONE_CLS: Record<ReturnType<typeof premiumTone>, string> = {
  high: 'text-rose-600 dark:text-rose-400 font-bold',
  up: 'text-rose-600/80 dark:text-rose-400/80',
  flat: 'text-slate-500 dark:text-slate-400',
  down: 'text-blue-600/80 dark:text-blue-400/80',
  low: 'text-blue-600 dark:text-blue-400 font-bold',
  none: 'text-slate-300 dark:text-slate-600',
};

const won = (v: number | null | undefined) => {
  if (v == null || !isFinite(v)) return '—';
  if (v >= 1e12) return `${(v / 1e12).toFixed(1)}조`;
  if (v >= 1e8) return `${Math.round(v / 1e8).toLocaleString()}억`;
  if (v >= 1e4) return `${Math.round(v / 1e4).toLocaleString()}만`;
  return Math.round(v).toLocaleString();
};

/**
 * 해당 거래소에 상장돼 있지 않다는 뜻. 그냥 "—"만 두면 데이터가 깨진 것처럼 읽혀서
 * (업비트 KRW 275종목 / 빗썸 474종목이라 실제로 한쪽에만 있는 코인이 100개가 넘는다)
 * 미상장임을 글자로 밝힌다.
 */
function NotListed() {
  return <span className="text-slate-300 dark:text-slate-600 text-[11px]" title="이 거래소에 원화 마켓이 없습니다">미상장</span>;
}

/** 원화 가격은 자릿수가 코인마다 크게 달라 유효숫자로 맞춘다 */
const krw = (v: number | null) => {
  if (v == null || !isFinite(v)) return '—';
  if (v >= 1000) return Math.round(v).toLocaleString();
  if (v >= 1) return v.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (v >= 0.01) return v.toFixed(4);
  return v.toPrecision(3);
};

function Pm({ value }: { value: number | null }) {
  if (value == null || !isFinite(value)) return <span className="text-slate-300 dark:text-slate-600">—</span>;
  return (
    <span className={`tabular-nums ${TONE_CLS[premiumTone(value)]}`}>
      {value >= 0 ? '+' : ''}{value.toFixed(2)}%
    </span>
  );
}

export default function KimchiBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<KimchiSnapshot | null>(null);
  const [pickedBasis, setBasis] = useState<Basis>('fx');
  const [sortKey, setSortKey] = useState<SortKey>('volume');
  const [query, setQuery] = useState('');

  /**
   * 재시도는 이 키를 올려 아래 이펙트를 다시 돌린다. 이펙트 본문에서 직접
   * setState를 부르면 렌더가 한 번 더 도는데, 상태 변경을 전부 promise 콜백
   * 안으로 밀어넣으면 그 경로가 아예 사라진다. 덤으로 언마운트된 뒤 도착한
   * 응답이 setState를 부르는 것도 alive 플래그로 막힌다.
   */
  const [reloadKey, setReloadKey] = useState(0);
  /** 왜 실패했는지 — "거래소 API가 막혔을 수 있습니다"보다 어느 소스인지 말하는 편이 낫다 */
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchKimchi()
      .then(s => {
        if (!alive) return;
        setSnap(s);
        setErrMsg(null);
        setState('ready');
      })
      .catch((e: unknown) => {
        if (!alive) return;
        setErrMsg(e instanceof KimchiUnavailableError ? e.message : null);
        setState('error');
      });
    return () => { alive = false; };
  }, [reloadKey]);

  // 1분마다 조용히 갱신 — 김프는 분 단위로도 눈에 띄게 움직인다
  useEffect(() => {
    if (state !== 'ready') return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      fetchKimchi().then(setSnap).catch(() => {});
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    return () => clearTimeout(timer);
  }, [state]);

  /**
   * 환율 소스가 죽으면 FX 기준은 계산 자체가 안 되고, USDT 시세가 없으면 USDT 기준이 안 된다.
   * 고른 기준을 못 쓰면 쓸 수 있는 쪽으로 자동 전환한다. 이펙트로 상태를 되돌리는 대신
   * 파생값으로 두면 렌더가 한 번 더 도는 경로가 아예 생기지 않는다.
   */
  const fxOk = snap ? snap.fxRate != null : true;
  const usdtOk = snap ? snap.usdtKrw != null : true;
  const basis: Basis =
    pickedBasis === 'fx' && !fxOk ? 'usdt'
    : pickedBasis === 'usdt' && !usdtOk ? 'fx'
    : pickedBasis;

  const premOf = useCallback(
    (r: KimchiRow, ex: 'upbit' | 'bithumb') =>
      basis === 'fx' ? (ex === 'upbit' ? r.upbitFx : r.bithumbFx) : ex === 'upbit' ? r.upbitUsdt : r.bithumbUsdt,
    [basis],
  );

  const rows = useMemo(() => {
    if (!snap) return [];
    const q = query.trim().toUpperCase();
    let list = q
      ? snap.rows.filter(r => r.base.includes(q) || r.koreanName.toUpperCase().includes(q))
      : snap.rows;
    if (sortKey === 'premium') {
      list = [...list].sort((a, b) => (premOf(b, 'upbit') ?? premOf(b, 'bithumb') ?? -999) - (premOf(a, 'upbit') ?? premOf(a, 'bithumb') ?? -999));
    } else if (sortKey === 'spread') {
      list = [...list].sort((a, b) => Math.abs(b.spread ?? 0) - Math.abs(a.spread ?? 0));
    }
    return list.slice(0, 120);
  }, [snap, query, sortKey, premOf]);

  const market = snap ? (basis === 'fx' ? snap.marketFx : snap.marketUsdt) : null;
  const btc = snap ? (basis === 'fx' ? snap.btcFx : snap.btcUsdt) : null;

  if (state === 'loading') {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">업비트·빗썸·바이낸스 시세 불러오는 중…</span>
      </div>
    );
  }

  if (state === 'error' || !snap) {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">{errMsg ?? '시세를 불러오지 못했습니다'}</span>
        <span className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-sm px-4">
          거래소 API가 일시적으로 막혔거나, 접속 지역에서 차단됐을 수 있습니다.
          업비트·빗썸 중 한 곳만 살아 있어도 화면은 정상 동작합니다.
        </span>
        <button onClick={() => { setState('loading'); setReloadKey(k => k + 1); }} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <>
      {/*
        일부 소스가 죽어도 화면은 계속 뜬다. 다만 조용히 빠지면 사용자는 왜 숫자가 비었는지
        알 수 없으므로, 빠진 소스를 이름으로 밝힌다.
      */}
      {snap.sources.some(s => !s.ok) && (
        <div role="status" className="rounded-lg border border-amber-500/30 bg-amber-500/[0.08] px-4 py-3 mb-4 text-xs text-amber-800 dark:text-amber-200/90 leading-relaxed">
          <b>일부 데이터를 받지 못했습니다.</b>{' '}
          {snap.sources.filter(s => !s.ok).map(s => s.label).join(' · ')} 응답이 없어 해당 값은 &quot;—&quot;로 표시됩니다.
          나머지 소스로 계산한 값은 정상입니다.
        </div>
      )}

      {/* 헤드라인 — 사람들이 이 페이지에 오는 이유는 이 숫자 하나다 */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 mb-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1">
              지금 김치 프리미엄 · {basis === 'fx' ? '공식 환율 기준' : 'USDT 기준'}
            </p>
            <p className={`text-5xl font-bold tabular-nums ${TONE_CLS[premiumTone(market)]}`}>
              {market != null ? `${market >= 0 ? '+' : ''}${market.toFixed(2)}%` : '—'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              거래대금 상위 20개 코인의 중앙값 · 비트코인 <Pm value={btc} />
            </p>
          </div>

          <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
            {([['fx', '환율 기준'], ['usdt', 'USDT 기준']] as [Basis, string][]).map(([k, label]) => {
              const usable = k === 'fx' ? fxOk : usdtOk;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setBasis(k)}
                  disabled={!usable}
                  aria-pressed={basis === k}
                  title={usable ? undefined : '이 기준에 필요한 데이터를 받지 못했습니다'}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                    !usable ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    : basis === k ? 'bg-amber-500 text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-0.5">공식 환율</p>
            <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
              {snap.fxRate != null ? `${snap.fxRate.toFixed(2)}원` : <span className="text-slate-400 dark:text-slate-500">—</span>}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-0.5">USDT 시세</p>
            <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">
              {snap.usdtKrw != null ? `${snap.usdtKrw.toLocaleString()}원` : <span className="text-slate-400 dark:text-slate-500">—</span>}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-0.5">USDT 프리미엄</p>
            <p className="text-base font-bold tabular-nums">
              {snap.usdtPremium != null ? <Pm value={snap.usdtPremium} /> : <span className="text-slate-400 dark:text-slate-500">—</span>}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-0.5">비교 코인</p>
            <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{snap.rows.length}개</p>
          </div>
        </div>
      </div>

      {/* 두 기준의 차이를 설명 — 이걸 모르면 숫자가 왜 다른지 알 수 없다 */}
      <div className="note-warn mb-4">
        {basis === 'fx' ? (
          <>
            <b>환율 기준</b>은 뉴스와 커뮤니티에서 인용하는 그 김프입니다. 국내 원화 가격을 공식 USD/KRW 환율로 환산해 비교합니다.
            다만 공식 환율은 하루 한 번 갱신되므로 장중에는 고정된 값을 씁니다. 실제로 돈을 옮길 때 쓰는 값은 오른쪽의 <b>USDT 기준</b>입니다.
          </>
        ) : (
          <>
            <b>USDT 기준</b>은 실제 차익거래 경로를 그대로 반영합니다. 원화로 USDT를 사서 해외로 보내는 과정을 따르므로,
            {snap.usdtPremium != null ? (
              <> 국내 USDT 자체에 붙은 프리미엄({snap.usdtPremium >= 0 ? '+' : ''}{snap.usdtPremium.toFixed(2)}%)이 이미 반영돼 있습니다.
              같은 시점에 환율 기준과 {Math.abs((snap.marketFx ?? 0) - (snap.marketUsdt ?? 0)).toFixed(2)}%p 차이가 나는 이유가 이것입니다.</>
            ) : (
              <> 국내 USDT 프리미엄은 환율 소스가 복구되면 함께 표시됩니다.</>
            )}
          </>
        )}
      </div>

      {/* 검색 + 정렬 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="코인 검색 (비트코인, BTC, 리플…)"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">✕</button>
          )}
        </div>
        <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1">
          {([['volume', '거래대금순'], ['premium', '김프순'], ['spread', '거래소차순']] as [SortKey, string][]).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setSortKey(k)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                sortKey === k ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-700">
                <th className="sticky left-0 z-10 bg-white dark:bg-slate-900 text-left font-semibold px-4 py-3">코인</th>
                <th className="text-right font-semibold px-3 py-3">업비트</th>
                <th className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">김프</th>
                <th className="hidden sm:table-cell text-right font-semibold px-3 py-3">빗썸</th>
                <th className="hidden sm:table-cell text-right font-semibold px-3 py-3">김프</th>
                <th className="hidden lg:table-cell text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">거래소차</th>
                <th className="hidden md:table-cell text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  거래대금
                  <span className="block text-[9px] font-normal text-slate-400 dark:text-slate-500 normal-case tracking-normal">업비트 / 빗썸 24h</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.base} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="sticky left-0 z-10 bg-white dark:bg-slate-900 px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <CoinLogo base={r.base} size={22} />
                      <span className="font-bold text-slate-900 dark:text-white">{r.koreanName}</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">{r.base}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-slate-700 dark:text-slate-200">{r.upbit == null ? <NotListed /> : krw(r.upbit)}</td>
                  <td className="px-3 py-2.5 text-right border-l border-slate-200/40 dark:border-slate-700/40">
                    <Pm value={premOf(r, 'upbit')} />
                  </td>
                  <td className="hidden sm:table-cell px-3 py-2.5 text-right tabular-nums text-slate-700 dark:text-slate-200">{r.bithumb == null ? <NotListed /> : krw(r.bithumb)}</td>
                  <td className="hidden sm:table-cell px-3 py-2.5 text-right"><Pm value={premOf(r, 'bithumb')} /></td>
                  <td className="hidden lg:table-cell px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40">
                    {r.spread != null ? (
                      <span className={Math.abs(r.spread) >= 1 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-400 dark:text-slate-500'}>
                        {r.spread >= 0 ? '+' : ''}{r.spread.toFixed(2)}%
                      </span>
                    ) : <span className="text-slate-300 dark:text-slate-600">—</span>}
                  </td>
                  <td className="hidden md:table-cell px-4 py-2.5 text-right tabular-nums text-[11px] text-slate-500 dark:text-slate-400 border-l border-slate-200/40 dark:border-slate-700/40">
                    {won(r.upbitVolume)} / {won(r.bithumbVolume)}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400">&quot;{query}&quot;와 일치하는 코인이 없습니다</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          거래대금이 작은 코인의 큰 김프는 실수요가 아니라 얕은 호가일 수 있습니다 — 숫자와 거래대금을 함께 보세요.
          같은 티커에 다른 토큰을 상장한 경우가 있어(예: 업비트 DATA는 데이터네트워크, 바이낸스 DATA는 Streamr)
          가격차가 ±60%를 넘는 {snap.excluded}개 코인은 비교에서 제외했습니다.
          <span className="block mt-1 text-slate-400 dark:text-slate-500">
            갱신 {snap.fetchedAt.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} · 1분마다 자동 갱신
            {snap.fxUpdated && <> · 환율 기준일 {new Date(snap.fxUpdated).toLocaleDateString('ko-KR')}</>}
          </span>
        </div>
      </div>
    </>
  );
}
