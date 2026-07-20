import { RANKED_REFERRALS, REFERRAL_REL, RISK_NOTE_KO, RISK_NOTE_EN } from '@/lib/referral';

/**
 * 제휴 거래소 카드 — 푸터(한국어)와 crypto 섹션(영어)이 같이 쓴다.
 *
 * 두 곳에서 같은 마크업을 쓰는 이유는 프로모션 금액이 바뀔 때 한 군데만 고치면
 * 되게 하려는 것이다. 예전에는 푸터의 작은 텍스트 링크와 signals 페이지의 카드가
 * 각각 금액을 하드코딩하고 있어서, 한쪽만 고치면 두 화면이 다른 금액을 말했다.
 *
 * "광고" 표기와 위험 고지는 빼지 않는다. 크게 노출할수록 더 필요하다 —
 * 원금 전액을 잃을 수 있는 상품이고, 우리는 가입에 대해 수수료를 받는다.
 */

function BinanceMark() {
  return (
    <svg viewBox="0 0 126 126" className="w-6 h-6 shrink-0" aria-hidden="true">
      <path fill="#F3BA2F" d="M38.87 53.62 63 29.49l24.14 24.14 14.04-14.04L63 1.41 24.83 39.58zM1.4 63l14.04-14.04L29.48 63 15.44 77.04zM38.87 72.38 63 96.51l24.13-24.13 14.05 14.03L63 124.59 24.83 86.42zM96.52 63l14.04-14.04L124.6 63l-14.04 14.04zM77.25 62.99 63 48.74 52.46 59.28l-1.21 1.21-2.5 2.5L63 77.26z" />
    </svg>
  );
}

/**
 * 공식 Bybit 워드마크(위키미디어). 글자는 currentColor로 두어 부모의 텍스트 색을
 * 따라가게 한다 — 흰색으로 박아두면 라이트 배경에서 글자가 사라진다.
 */
function BybitMark() {
  const L = 'currentColor';
  return (
    <svg viewBox="0 0 13547 4513" className="h-5 w-auto shrink-0 text-slate-900 dark:text-slate-50" role="img" aria-label="Bybit">
      <polygon fill="#F6A500" points="9655,3480 9655,-1 10355,-1 10355,3480" />
      <path fill={L} d="M1500 4514l-1500 0 0 -3481 1440 0c700,0 1107,381 1107,978 0,386 -262,636 -443,719 216,98 493,318 493,782 0,650 -458,1002 -1097,1002zm-116 -2875l0 0 -685 0 0 802 685 0c297,0 463,-161 463,-401 0,-239 -166,-401 -463,-401zm45 1413l0 0 -730 0 0 856 730 0c317,0 468,-195 468,-430 0,-235 -151,-425 -468,-425z" />
      <polygon fill={L} points="4732,3086 4732,4514 4037,4514 4037,3086 2960,1033 3720,1033 4389,2436 5049,1033 5809,1033" />
      <path fill={L} d="M7793 4514l-1500 0 0 -3481 1440 0c700,0 1107,381 1107,978 0,386 -262,636 -443,719 216,98 493,318 493,782 0,650 -458,1002 -1097,1002zm-116 -2875l0 0 -685 0 0 802 685 0c297,0 463,-161 463,-401 0,-239 -166,-401 -463,-401zm45 1413l0 0 -730 0 0 856 730 0c317,0 468,-195 468,-430 0,-235 -151,-425 -468,-425z" />
      <polygon fill={L} points="12610,1639 12610,4514 11911,4514 11911,1639 10974,1639 10974,1033 13547,1033 13547,1639" />
    </svg>
  );
}

function BrandMark({ id }: { id: string }) {
  if (id === 'bybit') return <BybitMark />;
  if (id === 'binance') {
    return (
      <span className="flex items-center gap-1.5">
        <BinanceMark />
        <span className="text-[15px] font-black tracking-tight text-slate-900 dark:text-slate-50">BINANCE</span>
      </span>
    );
  }
  return null;
}

interface Props {
  lang?: 'ko' | 'en';
  /** 섹션 제목. 생략하면 기본 문구 */
  heading?: string;
}

export default function ReferralCards({ lang = 'ko', heading }: Props) {
  const ko = lang === 'ko';
  const title = heading ?? (ko ? '코인 선물 거래소 가입 혜택' : 'Exchange sign-up bonuses');

  return (
    <section className="not-prose">
      <div className="flex items-center gap-2 mb-3">
        {/* "광고" 표기를 눈에 띄게 둔다. 숨기면 당장 클릭이 늘어도 신뢰를 잃는다. */}
        <span className="shrink-0 rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {ko ? '광고' : 'Ad'}
        </span>
        <h2 className="text-sm font-black text-slate-800 dark:text-slate-100">{title}</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {RANKED_REFERRALS.map(r => {
          const copy = ko ? r.ko : r.en;
          const top = r.rank === 1;
          return (
            <a
              key={r.id}
              href={r.href}
              target="_blank"
              rel={REFERRAL_REL}
              className={`group relative overflow-hidden rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                top
                  ? 'border-2 border-amber-400 dark:border-amber-500/60 bg-gradient-to-br from-amber-50 via-yellow-50/60 to-white dark:from-amber-500/[0.18] dark:via-amber-600/[0.06] dark:to-transparent hover:shadow-amber-500/20'
                  : 'border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/60 dark:to-transparent hover:border-amber-300 hover:shadow-amber-500/10'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full blur-2xl transition-colors ${
                  top ? 'bg-amber-300/50 dark:bg-amber-400/20 group-hover:bg-amber-300/70' : 'bg-slate-200/50 dark:bg-slate-600/20'
                }`}
              />

              <span className="relative flex items-center gap-2 mb-3">
                <BrandMark id={r.id} />
                <span
                  className={`ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black ${
                    top
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 dark:bg-slate-700 text-white'
                  }`}
                >
                  🏆 {copy.rankLabel}
                </span>
              </span>

              <span className="relative block">
                <span className={`block font-black leading-none text-amber-700 dark:text-amber-300 ${top ? 'text-[32px]' : 'text-[26px]'}`}>
                  {copy.bonus}
                </span>
                <span className="mt-2 block text-xs text-slate-600 dark:text-slate-400">
                  {copy.perks.join(' · ')}
                </span>
              </span>

              <span
                className={`relative mt-4 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-black transition-colors ${
                  top
                    ? 'bg-amber-400 text-slate-950 group-hover:bg-amber-300'
                    : 'bg-slate-800 dark:bg-slate-700 text-white group-hover:bg-slate-900 dark:group-hover:bg-slate-600'
                }`}
              >
                {copy.cta}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </a>
          );
        })}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
        {ko ? RISK_NOTE_KO : RISK_NOTE_EN}
      </p>
    </section>
  );
}
