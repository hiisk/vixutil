/**
 * 섹션을 가로지르는 관련 콘텐츠 연결.
 *
 * RelatedCalcs / RelatedContent는 같은 섹션 안에서만 추천한다. 그래서 실업급여
 * 계산기를 보는 사람이 실업급여 신청 체크리스트로 갈 방법이 없었다 — 정작 그게
 * 바로 다음에 필요한 것인데도.
 *
 * 자동으로 엮기 어려운(카테고리가 서로 다른 체계다) 대신 실제로 이어지는 것만
 * 손으로 골라 잇는다. 억지로 채우지 않는다 — 관련 없는 추천은 없느니만 못하다.
 */
export interface CrossLink {
  href: string;
  title: string;
  /** 왜 지금 이게 필요한지 한 줄로. 클릭 여부를 가른다. */
  why: string;
  icon: string;
}

/** 키는 선행 슬래시를 뺀 라우트 경로 */
export const CROSS_LINKS: Record<string, CrossLink[]> = {
  /* ── 계산기 → 체크리스트 ── */
  'calculator/unemployment': [
    { href: '/checklist/unemployment-claim', title: '실업급여 신청 체크리스트', why: '퇴사 사유가 이직확인서에 뭐로 적히는지가 수급 여부를 가릅니다', icon: '📄' },
  ],
  'calculator/severance': [
    { href: '/checklist/quit-job', title: '퇴사 준비 체크리스트', why: '인수인계와 금전·행정 정리에서 놓치기 쉬운 것들', icon: '👋' },
    { href: '/checklist/unemployment-claim', title: '실업급여 신청 체크리스트', why: '퇴사 전에 확인해야 받을 수 있습니다', icon: '📄' },
  ],
  'calculator/annual-leave': [
    { href: '/calculator/annual-leave-pay', title: '연차수당 계산기', why: '못 쓴 연차가 얼마의 수당이 되는지 계산합니다', icon: '💰' },
  ],
  'calculator/subscription-score': [
    { href: '/checklist/housing-subscription', title: '청약 준비 체크리스트', why: '당첨돼도 잔금을 못 치르면 소용없습니다', icon: '🏢' },
  ],
  'calculator/jeonwolse': [
    { href: '/checklist/jeonse-fraud', title: '전세사기 예방 체크리스트', why: '계약 전 등기부와 근저당부터 확인해야 합니다', icon: '🛡️' },
    { href: '/checklist/rental-inspection', title: '전월세 계약 전 집 점검', why: '계약 전에 봐야 나중에 다투지 않습니다', icon: '🔍' },
  ],
  'calculator/ltv': [
    { href: '/checklist/jeonse-fraud', title: '전세사기 예방 체크리스트', why: '근저당이 많은 집은 보증금이 위험합니다', icon: '🛡️' },
  ],
  'calculator/broker-fee': [
    { href: '/checklist/moving', title: '이사 체크리스트', why: '계약부터 입주 후 정리까지', icon: '📦' },
  ],
  'calculator/refinance': [
    { href: '/calculator/loan-prepayment-fee', title: '중도상환수수료 계산기', why: '갈아타기의 손익을 가르는 가장 큰 비용입니다', icon: '💸' },
  ],
  'calculator/pension-credit': [
    { href: '/checklist/year-end-tax', title: '연말정산 체크리스트', why: '연금계좌 말고도 챙길 공제가 남아 있습니다', icon: '🧾' },
    { href: '/checklist/pension-check', title: '연금 점검 체크리스트', why: '국민연금·퇴직연금까지 함께 봐야 노후가 보입니다', icon: '👴' },
  ],
  'calculator/comprehensive-tax': [
    { href: '/checklist/tax-filing', title: '종합소득세 신고 체크리스트', why: '신고 기한과 필요 서류를 놓치면 가산세가 붙습니다', icon: '📋' },
  ],
  'calculator/car-installment': [
    { href: '/checklist/car-buying', title: '자동차 구매 체크리스트', why: '차값 말고도 취득세·보험료가 따로 듭니다', icon: '🚗' },
  ],
  'calculator/car-tax': [
    { href: '/checklist/car-accident', title: '교통사고 대처 체크리스트', why: '사고 직후 5분이 과실비율을 가릅니다', icon: '🚨' },
  ],
  'calculator/bmi': [
    { href: '/checklist/diet-start', title: '다이어트 시작 체크리스트', why: '숫자를 알았다면 다음은 계획입니다', icon: '🥗' },
  ],
  'calculator/bmr': [
    { href: '/checklist/diet-start', title: '다이어트 시작 체크리스트', why: '기초대사량을 알았다면 섭취·운동 계획을 세울 차례입니다', icon: '🥗' },
  ],
  'calculator/salary': [
    { href: '/checklist/salary-negotiation', title: '연봉 협상 체크리스트', why: '실수령액을 알았다면 협상 근거를 준비할 차례입니다', icon: '🤝' },
  ],
  'calculator/target-salary': [
    { href: '/calculator/salary', title: '실수령액 계산기', why: '반대로 연봉에서 실수령액을 계산합니다', icon: '💵' },
    { href: '/checklist/salary-negotiation', title: '연봉 협상 체크리스트', why: '목표 연봉이 정해졌다면 근거를 준비할 차례입니다', icon: '🤝' },
  ],

  /* ── 체크리스트 → 계산기 ── */
  'checklist/unemployment-claim': [
    { href: '/calculator/unemployment', title: '실업급여 계산기', why: '얼마를 며칠 동안 받는지 미리 계산해보세요', icon: '🧮' },
  ],
  'checklist/housing-subscription': [
    { href: '/calculator/subscription-score', title: '청약 가점 계산기', why: '내 가점부터 알아야 전략이 나옵니다', icon: '🎯' },
    { href: '/calculator/ltv', title: 'LTV 계산기', why: '잔금 대출이 얼마나 나오는지 미리 확인하세요', icon: '🏦' },
  ],
  'checklist/jeonse-fraud': [
    { href: '/calculator/jeonwolse', title: '전월세 전환 계산기', why: '전세와 월세 중 뭐가 유리한지 비교해보세요', icon: '🏠' },
  ],
  'checklist/quit-job': [
    { href: '/calculator/severance', title: '퇴직금 계산기', why: '받을 퇴직금을 미리 확인하세요', icon: '💰' },
  ],
  'checklist/year-end-tax': [
    { href: '/calculator/pension-credit', title: '연금저축·IRP 세액공제 계산기', why: '한도를 채우면 최대 148만 원을 돌려받습니다', icon: '💳' },
  ],
  'checklist/car-buying': [
    { href: '/calculator/car-installment', title: '자동차 할부 계산기', why: '월 할부금과 총 이자를 먼저 계산해보세요', icon: '🚗' },
  ],
  'checklist/car-accident': [
    { href: '/calculator/car-tax', title: '자동차세 계산기', why: '차량 보유에 드는 세금도 확인해두세요', icon: '🧾' },
  ],
  'checklist/diet-start': [
    { href: '/calculator/bmr', title: '기초대사량 계산기', why: '내 기초대사량을 알아야 섭취량을 정할 수 있습니다', icon: '🔥' },
  ],
  'checklist/salary-negotiation': [
    { href: '/calculator/salary', title: '실수령액 계산기', why: '연봉이 아니라 실수령액으로 비교해야 합니다', icon: '💵' },
  ],
  'checklist/interview-day': [
    { href: '/calculator/salary', title: '실수령액 계산기', why: '처우 질문에 대비해 시장가를 알아두세요', icon: '💵' },
  ],
};
