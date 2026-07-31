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
 * 순위 문구는 근거를 밝혀야 한다는 규칙을 코드로 지킨다.
 * "1위"가 들어간 문구는 무엇에 대한 1위인지 앞에 붙어 있어야 한다.
 */
export function hasRankBasis(label: string): boolean {
  if (!/1위|#1/.test(label)) return true;
  const basis = label.replace(/1위|#1/g, '').trim();
  return basis.length >= 2;
}

