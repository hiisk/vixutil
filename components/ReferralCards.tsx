import { RANKED_REFERRALS, REFERRAL_REL, referralHref, referralSplit, referralSubId } from '@/lib/referral';
import type { AnyLocale10 } from '@/lib/locales';

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

/** 옆 레일(ReferralAside)도 같은 마크를 쓴다 — SVG를 두 벌로 두면 한쪽만 바뀐다 */
export function BrandMark({ id }: { id: string }) {
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

/**
 * 카드 머리글 — 언어마다.
 *
 * "광고" 표기는 어느 언어에서도 뺀 자리가 없어야 한다. 크게 노출할수록 더
 * 필요하다 — 푸터에 들어가면서 이 카드는 이제 모든 화면에 뜬다.
 *
 * ── why·rail을 더했다 (2026-08-12) ──
 * 카드가 작고 옅어서 그냥 지나쳐졌다. 크기를 올리는 것만으로는 "그래서 뭘
 * 얻는데?"에 답이 안 되므로 제목 아래 한 줄(why)을 붙였다. 금액은 여기 적지
 * 않는다 — 금액은 lib/referral.ts 한 곳에서만 오고, 화면 쪽에 적으면 프로모션이
 * 바뀔 때 두 곳이 어긋난다.
 *
 * rail은 옆 레일(ReferralAside)의 짧은 제목이다. 폭이 288px뿐이라 section 문구를
 * 그대로 쓰면 세 줄로 접힌다.
 *
 * 내보내는 이유 — 옆 레일이 같은 "광고" 표기와 같은 문구를 써야 한다. 열 언어를
 * 두 벌로 적어 두면 한쪽만 고쳐진다(용어 열쇠가 겹쳐 남의 라벨이 바뀐 적이 있다).
 */
export const HEADING: Record<AnyLocale10, { ad: string; section: string; result: string; why: string; rail: string }> = {
  ko: {
    ad: '광고', section: '코인 선물 거래소 가입 혜택', result: '결과를 본 김에 — 코인 거래소 가입 혜택',
    why: '가입만 해도 받는 보너스입니다. 조건은 거래소가 내건 문구를 그대로 옮겼습니다.',
    rail: '거래소 가입 혜택',
  },
  en: {
    ad: 'Ad', section: 'Claim your crypto exchange bonus', result: 'While you’re here — claim a crypto exchange bonus',
    why: 'Bonuses you get just for signing up. Terms are copied straight from each exchange.',
    rail: 'Exchange bonus',
  },
  es: {
    ad: 'Publicidad', section: 'Consigue tu bono en un exchange de criptomonedas', result: 'Ya que estás — consigue un bono de exchange',
    why: 'Bonos que recibes solo por registrarte. Las condiciones son las que publica cada exchange.',
    rail: 'Bono de exchange',
  },
  'pt-br': {
    ad: 'Publicidade', section: 'Garanta seu bônus em uma corretora de cripto', result: 'Já que está aqui — garanta um bônus de corretora',
    why: 'Bônus que você recebe só por se cadastrar. As condições são as que cada corretora anuncia.',
    rail: 'Bônus de corretora',
  },
  ja: {
    ad: '広告', section: '暗号資産取引所の登録特典', result: 'ついでに — 暗号資産取引所の登録特典',
    why: '登録するだけで受け取れる特典です。条件は各取引所の告知をそのまま載せています。',
    rail: '取引所の登録特典',
  },
  de: {
    ad: 'Anzeige', section: 'Krypto-Börsenbonus sichern', result: 'Wenn Sie schon hier sind — Krypto-Börsenbonus sichern',
    why: 'Boni, die es allein für die Anmeldung gibt. Die Bedingungen stammen direkt von der Börse.',
    rail: 'Börsen-Bonus',
  },
  fr: {
    ad: 'Publicité', section: 'Obtenez votre bonus de plateforme crypto', result: 'Tant que vous êtes là — un bonus de plateforme crypto',
    why: 'Des bonus offerts à la simple inscription. Les conditions sont reprises telles quelles de chaque plateforme.',
    rail: 'Bonus de plateforme',
  },
  hi: {
    ad: 'विज्ञापन', section: 'क्रिप्टो एक्सचेंज बोनस पाएँ', result: 'आए ही हैं तो — क्रिप्टो एक्सचेंज बोनस पाएँ',
    why: 'सिर्फ़ साइन अप करने पर मिलने वाले बोनस। शर्तें हर एक्सचेंज की घोषणा से ज्यों की त्यों ली गई हैं।',
    rail: 'एक्सचेंज बोनस',
  },
  'zh-hans': {
    ad: '广告', section: '加密货币交易所注册福利', result: '顺便看看 — 加密货币交易所注册福利',
    why: '只要注册就能领取的福利。条件均按各交易所公告原样列出。',
    rail: '交易所注册福利',
  },
  'zh-hant': {
    ad: '廣告', section: '加密貨幣交易所註冊優惠', result: '順便看看 — 加密貨幣交易所註冊優惠',
    why: '只要註冊就能領取的優惠。條件皆依各交易所公告原樣列出。',
    rail: '交易所註冊優惠',
  },
};

interface Props {
  lang?: AnyLocale10;
  /** 섹션 제목. 생략하면 기본 문구 */
  heading?: string;
  /**
   * 'result' — 테스트·퀴즈 결과 화면처럼 사용자가 버튼을 눌러 도달한 자리.
   * 시선이 가장 오래 머무는 지점이라 테두리를 세워 눈에 띄게 한다.
   *
   * 팝업이나 결과를 덮는 오버레이로 만들지 않는다. 방금 저품질 판정을 받은
   * 사이트에서 인터스티셜은 애드센스 정책에 정면으로 걸리고, 사용자가 보려고
   * 누른 결과를 가리면 광고를 보기 전에 뒤로 가기를 누른다.
   *
   * 갈래를 더하지 않았다 — 옆 레일은 'aside' 갈래가 아니라 별도 컴포넌트
   * (ReferralAside)다. 세로 한 칸·sticky·288px라 이 격자 마크업과 공통점이
   * 거의 없어서, 여기에 세 번째 분기를 넣으면 삼항식이 줄마다 갈린다.
   */
  placement?: 'section' | 'result';
  /**
   * 이 화면에 옆 레일(ReferralAside)이 함께 뜨는가 (2026-08-12).
   *
   * true면 레일이 맡은 몫을 xl 이상에서 본문 카드에서 감춘다 — 같은 화면에 같은
   * 거래소가 두 번 뜨면 둘 다 값이 떨어진다. 가르는 규칙은 lib/referral.ts의
   * referralSplit 한 곳에 있다.
   *
   * 잃는 것 — xl 이상에서는 감춰진 카드가 DOM에 남는다(display:none). 대신
   * xl 미만(모바일 포함)에서는 본문 카드가 전부 그대로 보인다. 서버 렌더라
   * 화면 폭을 미리 알 수 없어, 둘 중 하나는 CSS로 감추는 수밖에 없었다.
   */
  rail?: boolean;
  /**
   * 이 카드가 선 섹션의 짧은 이름 (예: 'calc'·'crypto'·'fortune').
   *
   * sub-id에만 쓴다 — 어느 섹션이 전환을 만드는지 구분하려는 것이다. 짧게 쓴다:
   * 거래소 쪽에서 파라미터가 길면 잘린다(lib/referral.ts의 referralSubId).
   * 안 넘기면 언어와 자리만 남는다. **사용자 입력을 여기 넘기지 않는다.**
   */
  section?: string;
}

export default function ReferralCards({ lang = 'ko', heading, placement = 'section', rail = false, section }: Props) {
  const inResult = placement === 'result';
  const t = HEADING[lang] ?? HEADING.en;
  const title = heading ?? (inResult ? t.result : t.section);
  // 레일이 맡은 몫 — 넓은 화면에서만 본문 카드에서 감춘다
  const railIds = new Set(referralSplit(rail).rail.map(r => r.id));
  // 어느 언어·어느 섹션·어느 자리에서 눌렀는지 (개인정보 없음)
  const subId = referralSubId(lang, placement, section);

  return (
    /*
      ── 겉 상자를 뺐다 (2026-08-19) ──────────────────────────────
      result 자리는 노란 테두리 상자 **안에** 노란 카드가 또 들어 있었다. 같은
      색 판이 두 겹이라 어느 쪽이 누를 것인지 흐려지고, 계산기 폼이 200px인데
      광고가 330px이라 도구보다 광고가 큰 화면이 됐다.

      상자를 없애고 위에 실선 하나만 남긴다. "여기부터 광고"라는 경계는 실선과
      「광고」 표기가 이미 말하고 있다. 노출은 그대로고 높이만 준다.
    */
    <section
      className={`${
        inResult
          ? 'not-prose mt-8 border-t border-slate-200 dark:border-slate-800 pt-5'
          : 'not-prose'
      }${rail ? ' xl:hidden' : ''}`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        {/* "광고" 표기를 눈에 띄게 둔다. 숨기면 당장 클릭이 늘어도 신뢰를 잃는다. */}
        <span className="shrink-0 rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {t.ad}
        </span>
        {/* 제목을 한 단계 키웠다. text-sm은 본문 글씨와 같아서 머리글로 안 읽혔다. */}
        <h2 className="text-base font-black text-slate-800 dark:text-slate-100">{title}</h2>
      </div>
      {/* 무엇을 얻는지 한 줄 — 제목만 있으면 "그래서 뭘 얻는데?"에 답이 없다 */}
      <p className="mb-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{t.why}</p>

      <div className={`grid gap-3 sm:grid-cols-2${rail ? ' xl:grid-cols-1' : ''}`}>
        {RANKED_REFERRALS.map(r => {
          const copy = r.copy[lang] ?? r.copy.en;
          const top = r.rank === 1;
          return (
            <a
              key={r.id}
              href={referralHref(r, subId)}
              target="_blank"
              rel={REFERRAL_REL}
              /*
                거래소가 sub-id를 안 받아 주므로(각 거래소 주석 참고) 우리 쪽에서라도
                구분할 수 있게 값을 마크업에 남긴다. GoogleAnalytics의 클릭 위임
                리스너가 이 두 속성을 읽어 referral_click 이벤트로 보낸다.
              */
              data-ref-id={r.id}
              data-ref-sub={subId}
              /*
                ── 노란 판을 걷었다 (2026-08-19) ──────────────────
                1위 카드가 노란 테두리에 노란 바탕이라, 화면에서 제일 센 것이
                도구가 아니라 광고였다. 도구를 쓰러 온 사람에게 그 순서는 틀렸고,
                노란 광고판은 «비싼 화면»에서 안 보이는 물건이다.

                판은 다른 카드와 같은 흰 판으로 두고, **색은 누를 자리에만** 남긴다.
                버튼은 그대로 노랗다 — 노출을 줄인 게 아니라 시끄러움만 줄였다.
              */
              className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-150 hover:-translate-y-0.5 ${
                railIds.has(r.id) ? 'xl:hidden ' : ''
              }${
                top
                  ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 dark:hover:border-amber-600/60'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 dark:hover:border-amber-600/60'
              }`}
            >
              {/*
                ── 가로로 눕혔다 (2026-08-19) ──────────────────────
                로고 → 금액 → 혜택을 세로로 쌓고 그 아래 버튼을 깔면 한 장에
                330px이 든다. 넓은 화면에서는 왼쪽에 글, 오른쪽에 버튼을 두어
                절반으로 줄인다. 금액은 여전히 카드에서 제일 큰 글자다.

                모바일(sm 미만)에서는 그대로 쌓인다 — 가로로 두면 버튼이 좁아져
                누를 자리가 작아진다.
              */}
              <span className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-y-1 gap-2">
                    <BrandMark id={r.id} />
                    <span
                      className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[10px] font-bold text-slate-500 dark:text-slate-400" 
                    >
                      🏆 {copy.rankLabel}
                    </span>
                  </span>
                  <span className={`mt-1.5 block font-black leading-none tabular-nums text-slate-900 dark:text-slate-50 ${top ? 'text-[26px]' : 'text-[22px]'}`}>
                    {copy.bonus}
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {copy.perks.join(' · ')}
                  </span>
                </span>

                {/*
                  광택 스윕을 뺐다 — 화면에서 끊임없이 움직이는 것이 제일 싸구려로
                  읽힌다. 대신 이 버튼만 색을 갖는다(판은 흰색). 누를 자리가 화면에
                  하나뿐이면 굳이 반짝이지 않아도 눈이 간다.
                */}
                <span className="relative flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition-colors duration-150 group-hover:bg-amber-300 sm:w-auto">
                  <span>{copy.cta}</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
