/**
 * 제휴(레퍼럴) 링크.
 *
 * 순위 문구에 대해 — "1위"는 기준을 밝힌 것만 쓴다.
 * Bybit의 "신규 가입 혜택 1위"는 두 거래소의 가입 보너스 상한($30,000 vs $600)을
 * 비교한 것이고, Binance의 "선물 거래량 1위"는 널리 알려진 사실이다. 반면 근거 없는
 * 종합 순위("코인 선물 사이트 1위")는 쓰지 않는다 — 돈이 오가는 결정을 앞둔 사람에게
 * 확인할 수 없는 순위를 사실처럼 보여주는 건 표시광고법 문제이기도 하고, 나중에
 * 사이트 신뢰가 깎이면 제휴 수익보다 잃는 게 크다.
 *
 * 혜택 금액과 부가 조건은 각 거래소가 내건 문구를 그대로 옮긴 것이다. 임의로
 * 부풀리지 않는다. 프로모션이 바뀌면 여기만 고치면 된다.
 *
 * rel에 sponsored를 반드시 넣는다 — 제휴 링크임을 검색엔진에 알리지 않으면
 * 링크 스팸으로 취급될 수 있다. "광고" 표기도 숨기지 않는다.
 */

import type { AnyLocale10 } from './locales.ts';

export interface ReferralCopy {
  /** 기준을 밝힌 순위 문구 */
  rankLabel: string;
  /** 보너스 상한 — 카드의 주인공 */
  bonus: string;
  /** 부가 혜택 */
  perks: string[];
  cta: string;
}

export interface Referral {
  id: string;
  name: string;
  href: string;
  /**
   * 이 거래소가 링크에서 받아 주는 sub-id 파라미터 이름 (2026-08-15).
   *
   * **확인된 곳에만 적는다.** 비워 두면 referralHref가 href를 글자 하나 안 바꾸고
   * 그대로 내보낸다 — 확인 안 된 파라미터를 붙였다가 링크가 깨지면 수익이 0이 된다.
   * 지금은 둘 다 비어 있고, 무엇을 확인했는지는 아래 각 거래소에 적어 두었다.
   */
  subIdParam?: string;
  /** 노출 순서 (1이 위) */
  rank: number;
  /**
   * 언어별 문구. 열 언어를 다 채운다 — 이 카드는 이제 푸터에 있어서 모든 화면에
   * 뜨고, 그중 대부분이 번역된 페이지다. 영어로 남겨 두면 일본어 화면 아래에
   * 영어 광고만 하나 붙는다.
   */
  copy: Record<AnyLocale10, ReferralCopy>;
}

export const REFERRALS: Referral[] = [
  {
    id: 'bybit',
    name: 'Bybit',
    href: 'https://partner.bybit.com/b/127153',
    /*
     * subIdParam 없음 — 붙일 이름을 확인하지 못했다 (2026-08-15).
     * partner.bybit.com/b/127153은 짧은 리디렉션 링크다. 리디렉터가 모르는
     * 쿼리를 그대로 넘겨줄지 버릴지 알 수 없고, 최악에는 코드 판독이 어긋난다.
     * Bybit 어필리에이트 도움말(bybit.com/en/help-center: Affiliate Program
     * General FAQ / Terms)과 affiliates.bybit.com FAQ에는 클릭 단위 sub-id
     * 파라미터가 없다 — 채널 구분은 포털에서 초대 코드를 따로 만들어서 한다.
     * 그러니 링크는 손대지 않는다. 포털에서 파라미터 이름을 확인하면 여기 한 줄만
     * 적으면 되고, 그전까지 갈래 구분은 GA(referral_click 이벤트)로 본다.
     */
    rank: 1,
    copy: {
      ko: {
      rankLabel: '신규 가입 혜택 1위',
      bonus: '최대 $30,000',
      perks: ['가입 즉시 $20 보너스', '거래 수수료 할인 혜택'],
      cta: '🎁 무료 보너스 받기',
      },
      en: {
      rankLabel: '#1 new-user bonus',
      bonus: 'Up to $30,000',
      perks: ['Instant $20 welcome bonus', 'Trading fee discount'],
      cta: '🎁 Claim free bonus',
      },
    es: {
      rankLabel: '#1 en bono de bienvenida',
      bonus: 'Hasta 30.000 USD',
      perks: ['Bono de 20 USD al registrarte', 'Descuento en comisiones'],
      cta: '🎁 Reclamar bono gratis',
    },
    'pt-br': {
      rankLabel: '#1 em bônus de boas-vindas',
      bonus: 'Até US$ 30.000',
      perks: ['Bônus de US$ 20 na inscrição', 'Desconto nas taxas'],
      cta: '🎁 Resgatar bônus grátis',
    },
    ja: {
      rankLabel: '新規登録特典1位',
      bonus: '最大 $30,000',
      perks: ['登録するとすぐ $20 ボーナス', '取引手数料の割引'],
      cta: '🎁 無料ボーナスを受け取る',
    },
    de: {
      rankLabel: '#1 Neukundenbonus',
      bonus: 'Bis zu 30.000 $',
      perks: ['20 $ Bonus sofort bei Anmeldung', 'Rabatt auf Handelsgebühren'],
      cta: '🎁 Gratis-Bonus sichern',
    },
    fr: {
      rankLabel: '#1 bonus de bienvenue',
      bonus: 'Jusqu’à 30 000 $',
      perks: ['20 $ offerts dès l’inscription', 'Réduction sur les frais'],
      cta: '🎁 Obtenir le bonus gratuit',
    },
    hi: {
      rankLabel: '#1 नए यूज़र बोनस',
      bonus: '$30,000 तक',
      perks: ['साइन अप पर तुरंत $20 बोनस', 'ट्रेडिंग फ़ीस पर छूट'],
      cta: '🎁 मुफ़्त बोनस लें',
    },
    'zh-hans': {
      rankLabel: '新用户福利第一',
      bonus: '最高 $30,000',
      perks: ['注册即得 $20 奖金', '交易手续费折扣'],
      cta: '🎁 领取免费奖金',
    },
    'zh-hant': {
      rankLabel: '新用戶優惠第一',
      bonus: '最高 $30,000',
      perks: ['註冊即得 $20 獎金', '交易手續費折扣'],
      cta: '🎁 領取免費獎金',
    },
    },
  },
  {
    id: 'binance',
    name: 'Binance',
    href: 'https://accounts.binance.com/register?ref=KLLDA01Q',
    /*
     * subIdParam 없음 — 받아 주는 파라미터가 없다 (2026-08-15).
     * Binance 어필리에이트 도움말 "How to Use the Binance Affiliate Referral
     * Dashboard Pro"는 채널 구분을 **대시보드에서 초대 코드를 따로 만들어**
     * 한다고 적는다(스팟 코드 50개까지, 코드마다 클릭·가입·수수료가 따로 집계).
     * 링크에 붙이는 sub-id 파라미터는 문서 어디에도 없다. 안 읽히는 파라미터를
     * 붙여 봐야 얻는 게 없고 링크만 길어지므로 그대로 둔다.
     */
    rank: 2,
    copy: {
      ko: {
      rankLabel: '선물 거래량 1위',
      bonus: '최대 $600',
      perks: ['거래 수수료 10% 할인'],
      cta: '🎁 무료 보너스 받기',
      },
      en: {
      rankLabel: '#1 by futures volume',
      bonus: 'Up to $600',
      perks: ['10% off trading fees'],
      cta: '🎁 Claim free bonus',
      },
    es: {
      rankLabel: '#1 por volumen de futuros',
      bonus: 'Hasta 600 USD',
      perks: ['10 % de descuento en comisiones'],
      cta: '🎁 Reclamar bono gratis',
    },
    'pt-br': {
      rankLabel: '#1 em volume de futuros',
      bonus: 'Até US$ 600',
      perks: ['10% de desconto nas taxas'],
      cta: '🎁 Resgatar bônus grátis',
    },
    ja: {
      rankLabel: '先物取引高1位',
      bonus: '最大 $600',
      perks: ['取引手数料が10%割引'],
      cta: '🎁 無料ボーナスを受け取る',
    },
    de: {
      rankLabel: '#1 nach Futures-Volumen',
      bonus: 'Bis zu 600 $',
      perks: ['10 % Rabatt auf Handelsgebühren'],
      cta: '🎁 Gratis-Bonus sichern',
    },
    fr: {
      rankLabel: '#1 en volume de futures',
      bonus: 'Jusqu’à 600 $',
      perks: ['10 % de réduction sur les frais'],
      cta: '🎁 Obtenir le bonus gratuit',
    },
    hi: {
      rankLabel: 'फ़्यूचर्स वॉल्यूम में #1',
      bonus: '$600 तक',
      perks: ['ट्रेडिंग फ़ीस पर 10% छूट'],
      cta: '🎁 मुफ़्त बोनस लें',
    },
    'zh-hans': {
      rankLabel: '合约交易量第一',
      bonus: '最高 $600',
      perks: ['交易手续费九折'],
      cta: '🎁 领取免费奖金',
    },
    'zh-hant': {
      rankLabel: '合約交易量第一',
      bonus: '最高 $600',
      perks: ['交易手續費九折'],
      cta: '🎁 領取免費獎金',
    },
    },
  },
];

/** rank 순으로 정렬된 목록 — 노출 순서를 데이터에서만 정한다 */
export const RANKED_REFERRALS = [...REFERRALS].sort((a, b) => a.rank - b.rank);

/** 제휴 링크에 반드시 붙여야 하는 rel */
export const REFERRAL_REL = 'noopener noreferrer sponsored';

/**
 * 클릭 한 번을 가리키는 짧은 이름 — sub-id (2026-08-15).
 *
 * 예: ko-calc-result · en-rail · zh-hans-section
 * 어느 언어 화면의, 어느 섹션의, 어느 자리에서 눌렀는지까지만 담는다.
 *
 * **개인정보는 한 조각도 넣지 않는다.** 세 값 모두 페이지가 무엇인지를 말할 뿐
 * 사람을 가리키지 않는다 — 사용자가 입력한 값(생년월일·이름·계산 입력)은 절대
 * 여기로 오지 않는다. 인자를 늘려 그런 값을 흘리지 않도록 받는 것을 셋으로 못박는다.
 *
 * 32자에서 끊는 이유 — 파라미터가 길면 거래소 쪽에서 잘린다. 잘린 값은 서로
 * 구별이 안 되므로 애초에 짧게 만든다. 소문자·숫자·하이픈만 남겨 인코딩도 없앤다.
 */
export function referralSubId(lang: AnyLocale10, placement: string, section?: string): string {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  // 잘린 끝에 하이픈만 남으면 보기에도 나쁘고 값도 어긋난다 — 잘라낸 뒤 한 번 더 다듬는다
  return [lang, section ?? '', placement].map(slug).filter(Boolean).join('-').slice(0, 32).replace(/-+$/, '');
}

/**
 * 제휴 링크를 만드는 **유일한** 자리. 카드도 옆 레일도 여기를 거친다.
 *
 * 문자열이 화면 쪽에 흩어져 있으면 한 곳만 고쳐지고 나머지는 옛 링크로 남는다
 * (예전에 크립토 페이지가 링크를 따로 박아 뒀던 것과 같은 사고다).
 *
 * subIdParam이 없는 거래소는 href를 **그대로** 돌려준다. 지금은 둘 다 그렇다 —
 * 왜인지는 REFERRALS 안의 각 거래소 주석에 적어 두었다.
 */
export function referralHref(r: Referral, subId: string): string {
  if (!r.subIdParam) return r.href;
  const u = new URL(r.href);
  u.searchParams.set(r.subIdParam, subId);
  return u.toString();
}

/**
 * 본문 카드와 옆 레일이 나눠 가질 몫 (2026-08-12).
 *
 * 넓은 화면에서 본문 옆 여백에 세로 레일을 세우면서 생긴 규칙이다. 같은 화면에
 * 같은 거래소를 두 번 보여 주면 둘 다 값이 떨어지므로 — 푸터 카드를 끄는 것과
 * 같은 이유다 — 레일이 뜨는 화면에서는 본문 카드가 1위만 남기고 나머지를 레일에
 * 넘긴다. 화면에 보이는 제휴 카드 수는 그대로 둘이고 자리만 갈린다.
 *
 * 1위를 본문에 두는 이유: 본문 카드가 크고 클릭이 가장 많은 자리다. 좁은 레일에
 * 보너스 상한이 가장 큰 것을 밀어 넣는 것보다 낫다.
 *
 * narrow를 따로 돌려주는 까닭 — 레일은 xl 이상에서만 뜨고, 그 아래(방문의 대부분인
 * 모바일)에서는 없다. 그래서 좁은 화면의 본문 카드는 **하나도 잃지 않고 전부**
 * 보여준다. 갈라 놓기만 하면 휴대폰 화면에서 제휴가 하나로 줄어든다.
 * 화면 폭으로 가르는 일은 CSS(xl:hidden)가 하고, 여기서는 어느 몫이 어디로
 * 가는지만 정한다.
 */
export function referralSplit(withRail: boolean): {
  /** 좁은 화면(레일 없음)에서 본문 카드가 보여주는 것 */
  narrow: Referral[];
  /** 넓은 화면(레일 있음)에서 본문 카드가 보여주는 것 */
  wide: Referral[];
  /** 넓은 화면에서 옆 레일이 보여주는 것 */
  rail: Referral[];
} {
  if (!withRail) return { narrow: RANKED_REFERRALS, wide: RANKED_REFERRALS, rail: [] };
  return {
    narrow: RANKED_REFERRALS,
    wide: RANKED_REFERRALS.slice(0, 1),
    rail: RANKED_REFERRALS.slice(1),
  };
}

/**
 * 순위 문구는 근거를 밝혀야 한다는 규칙을 코드로 지킨다.
 * "1위"가 들어간 문구는 무엇에 대한 1위인지 앞에 붙어 있어야 한다.
 */
export function hasRankBasis(label: string): boolean {
  if (!/1위|#1/.test(label)) return true;
  const basis = label.replace(/1위|#1/g, '').trim();
  return basis.length >= 2;
}

