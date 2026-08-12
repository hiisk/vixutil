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
  'calculator/monthly-rent-deduction': [
    { href: '/calculator/card-deduction', title: '신용카드 소득공제 계산기', why: '요건을 못 채우면 월세를 현금영수증으로 돌려야 합니다', icon: '💳' },
    { href: '/checklist/year-end-tax', title: '연말정산 체크리스트', why: '월세 말고도 챙길 공제가 남아 있습니다', icon: '🧾' },
  ],
  'calculator/maternity-leave': [
    { href: '/calculator/parental-leave', title: '육아휴직 급여 계산기', why: '출산전후휴가가 끝나면 이어서 쓰는 제도입니다', icon: '🍼' },
    { href: '/calculator/annual-leave', title: '연차 계산기', why: '휴가 기간의 연차 산정이 함께 문제가 됩니다', icon: '🗓️' },
  ],
  'calculator/school-rank': [
    { href: '/calculator/gpa', title: '학점/GPA 계산기', why: '대학 학점은 셈이 다릅니다', icon: '🎓' },
    { href: '/calculator/student-loan', title: '학자금 대출 상환 계산기', why: '진학 뒤의 셈입니다', icon: '📚' },
  ],
  'calculator/condolence-money': [
    { href: '/calculator/wedding-gift', title: '축의금 계산기', why: '경사 쪽은 판단의 축이 다릅니다', icon: '💐' },
    { href: '/checklist/condolence', title: '조문 예절 체크리스트', why: '금액을 정했으면 그다음은 복장과 절차입니다', icon: '🕯️' },
  ],
  'calculator/moving-cost': [
    { href: '/calculator/home-buying-cost', title: '집 살 때 부대비용 계산기', why: '그 계산기의 이사비 칸에 넣을 값이 여기서 나옵니다', icon: '💰' },
    { href: '/checklist/moving', title: '이사 준비 체크리스트', why: '견적을 정했으면 그다음은 날짜별로 할 일입니다', icon: '📦' },
  ],
  'calculator/new-year-money': [
    { href: '/calculator/wedding-gift', title: '축의금 계산기', why: '경조사비도 같은 방식으로 범위를 좁혀 봅니다', icon: '💐' },
    { href: '/calculator/gift-tax', title: '증여세 계산기', why: '해마다 모아 목돈이 되면 자금 출처를 따지게 됩니다', icon: '🎁' },
  ],
  'calculator/youth-savings': [
    { href: '/calculator/savings', title: '적금 계산기', why: '기여금이 없는 일반 적금과 얼마나 벌어지는지 보세요', icon: '🏦' },
    { href: '/calculator/interest-tax', title: '이자소득세 계산기', why: '비과세가 만드는 차이가 여기서 나옵니다', icon: '🧾' },
  ],
  'calculator/eitc': [
    { href: '/calculator/year-end-tax', title: '연말정산 환급액 계산기', why: '환급금과 장려금은 각각 받는 것이라 서로 줄이지 않습니다', icon: '🧾' },
    { href: '/calculator/median-income', title: '기준 중위소득 계산기', why: '다른 복지 지원에도 해당하는지 함께 보세요', icon: '📋' },
  ],
  'calculator/health-insurance-local': [
    { href: '/calculator/four-insurance', title: '4대보험 계산기', why: '직장에 다닐 때 내던 금액과 맞대어 보세요', icon: '🏢' },
    { href: '/calculator/ltc-copay', title: '장기요양 본인부담금 계산기', why: '보험료와 급여를 쓸 때 내는 돈은 다릅니다', icon: '🏥' },
  ],
  'calculator/student-loan': [
    { href: '/calculator/dti', title: 'DTI 계산기', why: '학자금 상환액이 다른 대출 한도를 먼저 먹습니다', icon: '🏦' },
    { href: '/calculator/loan-method', title: '대출 상환방식 비교 계산기', why: '일반 상환 쪽을 고를 때 방식까지 견줘 보세요', icon: '📊' },
  ],
  'calculator/median-income': [
    { href: '/calculator/basic-pension', title: '기초연금 수급 자격 계산기', why: '같은 이름의 소득인정액인데 기준이 달라 금액이 다르게 나옵니다', icon: '🧓' },
    { href: '/calculator/ltc-copay', title: '장기요양 본인부담금 계산기', why: '수급자로 정해지면 급여 몫이 면제됩니다', icon: '🏥' },
  ],
  'calculator/severance-vs-pension': [
    { href: '/calculator/retirement-income-tax', title: '퇴직소득세 계산기', why: '일시금으로 받을 때의 세금이 비교의 출발점입니다', icon: '🧾' },
    { href: '/checklist/retirement-prep', title: '은퇴·노후 준비 체크리스트', why: 'IRP 계좌를 미리 열어 두지 않으면 선택지가 하나로 줄어듭니다', icon: '🌇' },
  ],
  'calculator/inheritance-share': [
    { href: '/calculator/inheritance-tax', title: '상속세 계산기', why: '누가 얼마를 받는지 정한 다음이 세금입니다', icon: '🧾' },
    { href: '/calculator/gift-tax', title: '증여세 계산기', why: '미리 나눠 주는 쪽이 유리한 경우가 있습니다', icon: '🎁' },
  ],
  'calculator/card-deduction': [
    { href: '/calculator/monthly-rent-deduction', title: '월세 세액공제 계산기', why: '월세는 소득공제보다 세액공제 쪽이 훨씬 큽니다', icon: '🏠' },

    { href: '/calculator/year-end-tax', title: '연말정산 환급액 계산기', why: '여기서 낸 공제액을 넣으면 환급액이 얼마 늘어나는지 보입니다', icon: '🧾' },
    { href: '/checklist/year-end-tax', title: '연말정산 준비 체크리스트', why: '전통시장·대중교통 사용액은 따로 챙겨야 잡힙니다', icon: '📋' },
  ],
  'calculator/ltc-copay': [
    { href: '/checklist/parent-hospital', title: '부모님 입원 체크리스트', why: '등급 신청과 입원이 겹칠 때 챙길 것이 많습니다', icon: '🏥' },
    { href: '/calculator/basic-pension', title: '기초연금 수급 자격 계산기', why: '간병비를 소득으로 감당할 수 있는지 함께 보세요', icon: '🧓' },
  ],
  /* ── 연금·노후 계산기 → 체크리스트 (2026-08-12에 여섯 계산기를 내며 함께) ── */
  'calculator/national-pension': [
    { href: '/checklist/pension-check', title: '연금 점검 체크리스트', why: '내 연금 알아보기에서 확인할 것들을 순서대로 짚어 줍니다', icon: '📋' },
    { href: '/calculator/pension-catchup', title: '국민연금 추납·임의가입 계산기', why: '가입기간이 모자라면 채우는 쪽이 이득이 가장 큽니다', icon: '➕' },
  ],
  'calculator/basic-pension': [
    { href: '/checklist/pension-check', title: '연금 점검 체크리스트', why: '소득인정액을 구성하는 자료를 미리 모아 두면 신청이 빠릅니다', icon: '📋' },
    { href: '/calculator/national-pension', title: '국민연금 예상 수령액 계산기', why: '국민연금 액수가 기초연금 연계 감액을 가릅니다', icon: '🧓' },
  ],
  'calculator/pension-catchup': [
    { href: '/calculator/national-pension', title: '국민연금 예상 수령액 계산기', why: '채운 뒤 받게 되는 금액을 먼저 확인하세요', icon: '🧓' },
    { href: '/checklist/retirement-prep', title: '은퇴·노후 준비 체크리스트', why: '추납은 은퇴 준비에서 가장 확실한 수익 하나입니다', icon: '🌇' },
  ],
  'calculator/pension-tax': [
    { href: '/checklist/retirement-prep', title: '은퇴·노후 준비 체크리스트', why: '수령 순서와 시기를 정하는 것이 세금을 가릅니다', icon: '🌇' },
    { href: '/calculator/pension-credit', title: '연금저축·IRP 세액공제 계산기', why: '넣을 때 돌려받은 세금과 받을 때 내는 세금을 함께 보세요', icon: '💸' },
  ],
  'calculator/survivor-pension': [
    { href: '/checklist/pension-check', title: '연금 점검 체크리스트', why: '유족 자격과 청구 기한을 놓치면 받을 수 없습니다', icon: '📋' },
    { href: '/calculator/national-pension', title: '국민연금 예상 수령액 계산기', why: '내 노령연금과 유족연금 중 큰 쪽을 골라야 합니다', icon: '🧓' },
  ],
  'calculator/pension-split': [
    { href: '/calculator/national-pension', title: '국민연금 예상 수령액 계산기', why: '나눌 몫의 바탕이 되는 노령연금액을 먼저 구합니다', icon: '🧓' },
    { href: '/checklist/pension-check', title: '연금 점검 체크리스트', why: '청구 기한과 수급연령 요건을 함께 확인하세요', icon: '📋' },
  ],

  /* ── 세금·금융 ── */
  'calculator/year-end-tax': [
    { href: '/calculator/monthly-rent-deduction', title: '월세 세액공제 계산기', why: '세액공제 칸에 넣을 월세 공제액을 여기서 냅니다', icon: '🏠' },

    { href: '/calculator/card-deduction', title: '신용카드 소득공제 계산기', why: '공제 항목 중에서 금액이 가장 크게 갈리는 자리입니다', icon: '💳' },
    { href: '/checklist/year-end-tax', title: '연말정산 준비 체크리스트', why: '간소화 자료에서 빠지는 항목을 미리 챙겨야 환급이 늘어납니다', icon: '🧾' },
    { href: '/calculator/pension-credit', title: '연금저축·IRP 세액공제 계산기', why: '세액공제 칸에 넣을 금액을 여기서 구합니다', icon: '💸' },
  ],
  'calculator/dti': [
    { href: '/checklist/real-estate-buy', title: '내 집 마련 체크리스트', why: '한도를 알았으면 그다음은 자금 계획과 서류입니다', icon: '🏠' },
    { href: '/calculator/home-buying-cost', title: '집 살 때 부대비용 계산기', why: '대출 한도 말고도 현금으로 있어야 하는 돈이 있습니다', icon: '💰' },
  ],
  'calculator/home-buying-cost': [
    { href: '/checklist/real-estate-buy', title: '내 집 마련 체크리스트', why: '계약부터 잔금까지 순서대로 짚어 줍니다', icon: '🏠' },
    { href: '/checklist/renovation', title: '인테리어 리모델링 체크리스트', why: '부대비용에서 가장 크게 벌어지는 항목입니다', icon: '🔨' },
  ],
  'calculator/jeonse-safety': [
    { href: '/checklist/jeonse-fraud', title: '전세사기 예방 체크리스트', why: '숫자로 위험을 봤으면 그다음은 등기부와 계약서입니다', icon: '🚨' },
  ],

  /* ── 자동차 ── */
  'calculator/car-excise-tax': [
    { href: '/checklist/car-purchase', title: '자동차 구매 체크리스트', why: '출고가 말고도 계약 때 확인할 것이 남아 있습니다', icon: '🚗' },
    { href: '/calculator/car-registration', title: '자동차 취등록세 계산기', why: '출고가에 붙는 세금은 여기서 또 한 번 붙습니다', icon: '🧾' },
  ],
  'calculator/ev-vs-gas': [
    { href: '/checklist/car-purchase', title: '자동차 구매 체크리스트', why: '충전 환경을 못 갖추면 계산이 뒤집힙니다', icon: '🚗' },
    { href: '/calculator/car-lease-vs-loan', title: '자동차 리스·할부·현금 비교 계산기', why: '어떤 차를 살지 정했으면 어떻게 살지가 남았습니다', icon: '📊' },
  ],
  'calculator/car-lease-vs-loan': [
    { href: '/checklist/car-purchase', title: '자동차 구매 체크리스트', why: '계약 방식이 정해지면 그다음은 계약서 항목입니다', icon: '🚗' },
    { href: '/calculator/car-depreciation', title: '자동차 감가상각 계산기', why: '잔존가치를 얼마로 잡느냐가 비교 결과를 바꿉니다', icon: '📉' },
  ],

  /* ── 공과금 ── */
  'calculator/solar-payback': [
    { href: '/calculator/electricity', title: '전기요금 계산기', why: '누진 구간이 절감액을 정하므로 지금 요금부터 확인하세요', icon: '💡' },
    { href: '/calculator/appliance-power', title: '가전 전기요금 계산기', why: '무엇이 전기를 많이 먹는지 알면 절감 순서가 달라집니다', icon: '🔌' },
  ],
  'calculator/aircon-capacity': [
    { href: '/calculator/appliance-power', title: '가전 전기요금 계산기', why: '고른 용량으로 한 달에 얼마가 나오는지 봅니다', icon: '🔌' },
    { href: '/calculator/electricity', title: '전기요금 계산기', why: '에어컨 한 대가 누진 구간을 한 칸 올릴 수 있습니다', icon: '💡' },
  ],

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
    { href: '/calculator/monthly-rent-deduction', title: '월세 세액공제 계산기', why: '무주택 세입자가 가장 많이 놓치는 공제입니다', icon: '🏠' },

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
    { href: '/device/mic', title: '마이크 테스트', why: '화상 면접이라면 목소리가 어떻게 들리는지 먼저 들어보세요', icon: '🎤' },
  ],

  /* ── 체크리스트 → 기기 점검 ── */
  'checklist/used-trade-safety': [
    { href: '/device/keyboard', title: '키보드 테스트', why: '중고 키보드는 만나서 모든 키를 눌러 보고 사야 합니다', icon: '⌨️' },
    { href: '/device/monitor', title: '모니터 불량화소 테스트', why: '불량화소는 받은 자리에서 확인해야 되돌릴 수 있습니다', icon: '🖥️' },
    { href: '/image/mosaic', title: '모자이크 가리기', why: '인증샷을 보내기 전에 주소·계좌부터 가리세요', icon: '🔳' },
  ],
  'checklist/pc-setup': [
    { href: '/device/refresh-rate', title: '모니터 주사율 테스트', why: '고주사율 모니터가 60Hz로 잡혀 있는 경우가 흔합니다', icon: '⚡' },
    { href: '/device/monitor', title: '모니터 불량화소 테스트', why: '새 모니터는 개봉 직후에 죽은 픽셀부터 확인하세요', icon: '🖥️' },
  ],
  'checklist/work-from-home': [
    { href: '/device/mic', title: '마이크 테스트', why: '회의 시작 전에 소리가 어떻게 들리는지 1분이면 확인합니다', icon: '🎤' },
    { href: '/device/webcam', title: '웹캠 테스트', why: '카메라 화질과 각도를 미리 잡아두세요', icon: '📷' },
  ],
  'checklist/phone-upgrade': [
    { href: '/device/touch', title: '터치스크린 테스트', why: '개통 직후 터치 안 먹는 영역이 없는지 확인하세요', icon: '👆' },
    { href: '/device/info', title: '내 기기 정보', why: '해상도·브라우저 정보를 그대로 복사해 문의에 쓸 수 있습니다', icon: '🧾' },
  ],

  /* ── 기기 점검 → 체크리스트 ── */
  'device/monitor': [
    { href: '/checklist/used-trade-safety', title: '중고거래 안전 체크리스트', why: '중고 모니터는 확인할 것이 화면 말고도 더 있습니다', icon: '🤝' },
    { href: '/checklist/pc-setup', title: 'PC 셋업 체크리스트', why: '새로 맞춘 PC에서 빠뜨리기 쉬운 설정들', icon: '🖥️' },
  ],
  'device/mic': [
    { href: '/checklist/work-from-home', title: '재택근무 준비 체크리스트', why: '소리 말고도 회의 전에 챙길 것들이 있습니다', icon: '🏠' },
  ],
  'device/webcam': [
    { href: '/checklist/interview-day', title: '면접 당일 체크리스트', why: '화상 면접이라면 카메라 다음으로 챙길 것들', icon: '💼' },
  ],
  'device/keyboard': [
    { href: '/checklist/used-trade-safety', title: '중고거래 안전 체크리스트', why: '거래 장소와 결제 방법에서 사고가 더 많이 납니다', icon: '🤝' },
  ],

  /* ── 이미지 도구 ↔ 다른 섹션 ── */
  'image/palette': [
    { href: '/calculator/dev/color', title: '색상 코드 변환기', why: '뽑은 HEX를 RGB·HSL로 바꾸거나 밝기를 조절할 때', icon: '🎨' },
  ],
  'image/mosaic': [
    { href: '/checklist/used-trade-safety', title: '중고거래 안전 체크리스트', why: '가릴 것을 가렸다면 그다음은 거래 방법입니다', icon: '🤝' },
  ],
  'calculator/dev/color': [
    { href: '/image/palette', title: '이미지 색상 추출', why: '사진이나 스크린샷에서 색을 바로 뽑아 올 수 있습니다', icon: '🖼️' },
  ],

  /* ── 텍스트 도구 ↔ 다른 섹션 ── */
  'text/manuscript': [
    { href: '/calculator/dev/word-count', title: '글자수 카운터', why: '단어수·문장수·바이트까지 한 번에 보고 싶을 때', icon: '🔢' },
  ],
  'calculator/dev/word-count': [
    { href: '/text/manuscript', title: '원고지·자소서 글자수', why: '원고지 매수와 목표 글자수까지 남은 분량을 봅니다', icon: '📝' },
  ],
  'text/romanize': [
    { href: '/checklist/overseas-travel', title: '해외여행 준비 체크리스트', why: '여권 영문 이름을 정했다면 그다음에 챙길 것들', icon: '✈️' },
  ],
  'checklist/overseas-travel': [
    { href: '/text/romanize', title: '영문 이름 변환', why: '항공권 이름은 여권과 철자까지 같아야 합니다', icon: '🛂' },
  ],
  'checklist/study-abroad': [
    { href: '/text/romanize', title: '영문 이름 변환', why: '서류마다 영문 이름 표기를 통일해야 합니다', icon: '🛂' },
  ],
};
