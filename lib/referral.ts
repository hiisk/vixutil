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
  ko: ReferralCopy;
  en: ReferralCopy;
}

export const REFERRALS: Referral[] = [
  {
    id: 'bybit',
    name: 'Bybit',
    href: 'https://partner.bybit.com/b/127153',
    rank: 1,
    ko: {
      rankLabel: '신규 가입 혜택 1위',
      bonus: '최대 $30,000',
      perks: ['$20 웰컴 보너스', '거래 수수료 할인'],
      cta: '가입하고 혜택 받기',
    },
    en: {
      rankLabel: '#1 new-user bonus',
      bonus: 'Up to $30,000',
      perks: ['$20 welcome bonus', 'Trading fee discount'],
      cta: 'Claim bonus',
    },
  },
  {
    id: 'binance',
    name: 'Binance',
    href: 'https://accounts.binance.com/register?ref=KLLDA01Q',
    rank: 2,
    ko: {
      rankLabel: '선물 거래량 1위',
      bonus: '최대 $600',
      perks: ['거래 수수료 10% 할인'],
      cta: '가입하고 혜택 받기',
    },
    en: {
      rankLabel: '#1 by futures volume',
      bonus: 'Up to $600',
      perks: ['10% off trading fees'],
      cta: 'Claim bonus',
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

/** 투자 위험 고지 — 제휴 링크를 크게 노출하는 자리에는 반드시 함께 둔다 */
export const RISK_NOTE_KO =
  '가상자산 선물 거래는 원금 전액을 잃을 수 있는 고위험 상품입니다. 이 링크는 제휴 링크로, 가입 시 사이트가 수수료를 받습니다.';
export const RISK_NOTE_EN =
  'Crypto futures trading is high-risk and you can lose your entire principal. These are affiliate links — we earn a commission if you sign up.';
