/**
 * 제휴(레퍼럴) 링크.
 *
 * 크립토 페이지에만 하드코딩돼 있던 것을 공용으로 뺐다. 푸터에서도 쓴다.
 *
 * 푸터 노출은 의도적으로 작게 간다. 이 사이트 방문자는 대부분 실수령액이나
 * 전세사기 체크리스트를 보러 온 사람이라 코인 거래소와 맥락이 멀다. 큰 배너를
 * 전 페이지에 얹으면 광고 대 콘텐츠 비율이 나빠져 애드센스 쪽이 위험해지고,
 * 관련 없는 광고는 이탈만 늘린다. 작은 텍스트 링크로 노출만 확보한다.
 *
 * rel에 sponsored를 반드시 넣는다 — 제휴 링크임을 검색엔진에 알리지 않으면
 * 링크 스팸으로 취급될 수 있다.
 */
export interface Referral {
  id: string;
  name: string;
  href: string;
  /** 한 줄 혜택 문구 */
  perk: string;
}

export const REFERRALS: Referral[] = [
  {
    id: 'bybit',
    name: 'Bybit',
    href: 'https://partner.bybit.com/b/127153',
    perk: '최대 $30,000',
  },
  {
    id: 'binance',
    name: 'Binance',
    href: 'https://accounts.binance.com/register?ref=KLLDA01Q',
    perk: '최대 $600',
  },
];

/** 제휴 링크에 반드시 붙여야 하는 rel */
export const REFERRAL_REL = 'noopener noreferrer sponsored';
