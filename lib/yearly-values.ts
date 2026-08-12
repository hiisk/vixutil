/**
 * 해마다 바뀌는 값이 어디에 박혀 있는지 한 곳에 적어 둔다.
 *
 * ── 왜 이 파일이 있나 (2026-08-12) ─────────────────────────
 * 계산기 146개에는 **고시로 해마다 바뀌는 값**이 들어 있다. 세율 구간, 4대보험
 * 요율, 최저임금, 전기요금표, 연금 상수, 취득세율 …. 그런데 그것들이 스무 개
 * 가까운 파일에 흩어져 있고, **어디에 무엇이 있는지 아는 곳이 없었다.**
 *
 * 그래서 해가 바뀌어도 아무도 뭘 확인해야 하는지 모른다. 값은 그대로 남아
 * 그럴듯한 금액을 계속 내놓고, 틀렸다는 것은 사용자가 알려 주기 전까지 아무도
 * 모른다 — 화면도 빌드도 검사도 멀쩡하기 때문이다.
 *
 * ── 이 파일이 하는 일 ─────────────────────────────────────
 * 값 자체를 여기 두지 않는다. 값은 각 계산 파일에 있어야 하고, 여기에는
 * **"그 파일 어디에 무슨 값이 있고 무엇을 근거로 했는지"**만 적는다.
 * tests/yearly-values.test.ts가 이 표와 실제 파일을 맞대므로, 코드에서 값을
 * 고치고 이 표를 안 고치면 검사가 걸린다. 표가 낡는 것을 코드가 막는 셈이다.
 *
 * ── 해가 바뀌면 할 일 ─────────────────────────────────────
 * `YEARLY_VALUES`를 위에서 아래로 훑으며 `source`에 적힌 고시를 찾아 값을
 * 확인한다. 바뀐 것은 `file`의 값을 고치고 여기 `value`와 `asOf`도 함께 고친다.
 * `kind: 'rule'`인 것은 법이 정한 규칙이라 개정 때만 바뀐다.
 */

export type YearlyKind =
  /** 해마다 고시로 바뀐다 — 새해마다 확인해야 한다 */
  | 'yearly'
  /** 법이 정한 규칙이라 법 개정 때만 바뀐다 */
  | 'rule'
  /** 우리가 정한 어림 기준 — 법이 정한 것이 아니다 */
  | 'ours';

export interface YearlyValue {
  /** 무엇인가 */
  label: string;
  /** 어느 파일에 있나 (저장소 기준 상대 경로) */
  file: string;
  /**
   * 그 파일 안에서 이 값을 찾을 수 있는 문자열.
   * 검사가 원문에서 이것을 그대로 찾으므로 코드와 글자까지 같아야 한다.
   */
  needle: string;
  kind: YearlyKind;
  /** 이 값이 어느 해 기준인가 */
  asOf: number;
  /** 어디서 확인하나 */
  source: string;
  /** 확인할 때 알아 둘 것 */
  note?: string;
}

export const YEARLY_VALUES: YearlyValue[] = [
  /* ── 급여·보험 ── */
  {
    label: '국민연금 보험료율과 기준소득월액 상한',
    file: 'lib/salary.ts',
    needle: '6_170_000',
    kind: 'yearly',
    asOf: 2026,
    source: '국민연금공단 — 기준소득월액 상·하한액 고시',
    note: '상한액은 매년 7월에 바뀐다. 요율 4.5%(근로자분)는 오래 그대로다.',
  },
  {
    label: '건강보험료율 (근로자분)',
    file: 'lib/salary.ts',
    needle: '0.03545',
    kind: 'yearly',
    asOf: 2026,
    source: '국민건강보험공단 — 보험료율 고시',
  },
  {
    label: '고용보험료율 (근로자분)',
    file: 'lib/salary.ts',
    needle: '0.009',
    kind: 'yearly',
    asOf: 2026,
    source: '고용노동부 — 고용보험료율 고시',
  },
  {
    label: '출산전후휴가 급여 상한액(월)',
    file: 'lib/maternity-leave.ts',
    needle: '2_100_000',
    kind: 'yearly',
    asOf: 2026,
    source: '고용노동부 — 출산전후휴가 급여 상·하한액 고시',
    note: '하한은 최저임금 월 환산액이라 lib/minimum-wage.ts에 연동된다. 지금은 하한(2,156,880원)이 이 상한을 넘는 상태이고, 그것은 상한 고시가 낡았다는 신호다 — 상한을 올릴 때 이 값을 고친다.',
  },
  {
    label: '최저시급',
    file: 'lib/minimum-wage.ts',
    needle: '10_320',
    kind: 'yearly',
    asOf: 2026,
    source: '최저임금위원회 — 최저임금 고시 (전년 8월 고시)',
    note: '월 환산은 209시간 기준. 2026-08-13에 값을 lib/minimum-wage.ts 한 곳으로 모았다 — 출산전후휴가 급여의 하한도 그것을 가져다 쓴다. 화면 문구에도 연도와 금액이 적혀 있어 함께 고쳐야 한다.',
  },

  /* ── 소득세 ── */
  {
    label: '종합소득 기본세율 구간과 누진공제',
    file: 'lib/retirement-income-tax.ts',
    needle: 'export const TAX_BRACKETS',
    kind: 'rule',
    asOf: 2023,
    source: '소득세법 제55조',
    note: '2023년에 1,400만원 구간이 신설됐다. 이 표를 lib/pension-tax·year-end-tax·card-deduction이 함께 쓴다 — 한 곳만 고치면 어긋난다.',
  },
  {
    label: '근로소득세액공제 구간과 비율',
    file: 'lib/year-end-tax.ts',
    needle: 'export const CREDIT_STEP = 1_300_000;',
    kind: 'rule',
    asOf: 2026,
    source: '소득세법 제59조',
    note: '한도가 총급여에 따라 셋으로 갈린다. 한도 쪽이 더 자주 손질됐다.',
  },
  {
    label: '기본공제·경로우대·장애인 공제액',
    file: 'lib/year-end-tax.ts',
    needle: 'export const BASIC_DEDUCTION = 1_500_000;',
    kind: 'rule',
    asOf: 2026,
    source: '소득세법 제50조·제51조',
  },
  {
    label: '신용카드 소득공제 문턱과 한도',
    file: 'lib/card-deduction.ts',
    needle: 'export const THRESHOLD_RATIO = 0.25;',
    kind: 'rule',
    asOf: 2026,
    source: '조세특례제한법 제126조의2',
    note: '공제율과 추가한도는 한시로 올라간 해가 여러 번 있었다. 화면에서 입력으로 고칠 수 있게 두었다.',
  },

  /* ── 연금 ── */
  {
    label: '국민연금 기본연금액 상수 (해마다 0.015 감소, 2028년 1.2에서 멈춤)',
    file: 'lib/national-pension.ts',
    needle: 'export const CONST_STEP = 0.015;',
    kind: 'rule',
    asOf: 2026,
    source: '국민연금법 제51조',
    note: '값이 아니라 규칙이라 해가 바뀌어도 고칠 것이 없다. A값·B값은 코드에 박지 않고 입력으로 받는다.',
  },
  {
    label: '조기수령 감액률·연기연금 증액률',
    file: 'lib/national-pension.ts',
    needle: 'export const EARLY_PENALTY = 0.06;',
    kind: 'rule',
    asOf: 2026,
    source: '국민연금법 제61조·제62조',
  },
  {
    label: '연금소득공제 구간과 한도',
    file: 'lib/pension-tax.ts',
    needle: 'export const PENSION_DEDUCTION_CAP = 9_000_000;',
    kind: 'rule',
    asOf: 2026,
    source: '소득세법 제47조의2',
  },
  {
    label: '사적연금 저율 분리과세 한도와 세율',
    file: 'lib/pension-tax.ts',
    needle: 'export const PRIVATE_SEPARATE_LIMIT = 15_000_000;',
    kind: 'rule',
    asOf: 2026,
    source: '소득세법 제14조·제129조',
    note: '한도가 1,200만원에서 1,500만원으로 올라간 적이 있다.',
  },
  {
    label: '퇴직소득세 연금수령 감액률 (10년 이내 70%, 11년째부터 60%)',
    file: 'lib/severance-vs-pension.ts',
    needle: 'export const DEFERRED_RATE_EARLY',
    kind: 'rule',
    asOf: 2026,
    source: '소득세법 제129조 제1항',
  },
  {
    label: '기초연금 재산 소득환산율과 금융재산 공제',
    file: 'lib/basic-pension.ts',
    needle: 'export const ASSET_CONVERSION_RATE = 0.04;',
    kind: 'yearly',
    asOf: 2026,
    source: '보건복지부 — 기초연금 선정기준액 등 고시',
    note: '선정기준액·기준연금액·기본재산액·근로소득공제는 코드에 박지 않고 입력으로 받는다. 환산율 4%와 금융재산 공제 2,000만원만 상수다.',
  },
  {
    label: '장기요양 본인부담률과 감경률',
    file: 'lib/ltc-copay.ts',
    needle: 'SERVICE_RATES',
    kind: 'yearly',
    asOf: 2026,
    source: '노인장기요양보험법 시행령 — 본인부담금',
    note: '등급별 월 한도액은 코드에 박지 않고 입력으로 받는다.',
  },

  /* ── 부동산·자동차 ── */
  {
    label: '주택 취득세율 구간(6억·9억)과 지방교육세·농어촌특별세',
    file: 'lib/home-buying-cost.ts',
    needle: 'export const TIER_HIGH = 900_000_000;',
    kind: 'rule',
    asOf: 2026,
    source: '지방세법 제11조·제151조',
    note: '중과세율(8%·12%)은 정책에 따라 바뀌어 왔다. 2026-08-12에 취득세 계산기가 이 값을 함께 쓰게 했다.',
  },
  {
    label: '인지세 구간별 정액',
    file: 'lib/home-buying-cost.ts',
    needle: 'export const STAMP_HOUSE_EXEMPT_UNDER = 100_000_000;',
    kind: 'rule',
    asOf: 2026,
    source: '인지세법 제3조',
  },
  {
    label: '자동차 개별소비세 기본세율과 교육세율',
    file: 'lib/car-excise-tax.ts',
    needle: 'EDUCATION_TAX_RATE',
    kind: 'yearly',
    asOf: 2026,
    source: '개별소비세법 — 탄력세율 적용 여부',
    note: '기본 5%가 탄력세율로 3.5%까지 내려간 시기가 여러 번 있었고 반년 단위로 연장·종료됐다. 세율은 입력으로 받는다.',
  },
  {
    label: '자동차 취득세율과 경차 감면 한도',
    file: 'lib/car-registration.ts',
    needle: 'export const LIGHT_CAR_EXEMPTION',
    kind: 'rule',
    asOf: 2026,
    source: '지방세법 제12조 · 지방세특례제한법',
  },

  /* ── 공과금 ── */
  {
    label: '주택용 전기요금 누진 구간·기본요금·단가',
    file: 'lib/electricity-tariff.ts',
    needle: 'export const TIERS',
    kind: 'yearly',
    asOf: 2026,
    source: '한국전력 — 전기공급약관 (주택용 저압)',
    note: '/calculator/solar-payback과 /calculator/aircon-capacity가 이 표를 그대로 쓴다. 여기만 고치면 셋이 함께 맞는다.',
  },
  {
    label: '전력산업기반기금 요율',
    file: 'lib/electricity-tariff.ts',
    needle: 'export const FUND_RATE = 0.037;',
    kind: 'yearly',
    asOf: 2026,
    source: '전기사업법 시행령 — 부담금 요율',
  },

  /* ── 복지·장려금 (2026-08-12에 낸 계산기들) ── */
  {
    label: '근로·자녀장려금 재산 감액 비율과 기한 후 신청 비율',
    file: 'lib/eitc.ts',
    needle: 'export const HALF_RATIO = 0.5;',
    kind: 'rule',
    asOf: 2026,
    source: '조세특례제한법 — 근로장려금·자녀장려금',
    note: '기준금액·최대 지급액·구간 경계·재산 기준은 해마다 고시되어 코드에 없고 입력으로 받는다. 여기 있는 것은 조문의 두 비율뿐이다.',
  },
  {
    label: '지역가입자 보험료의 본인 부담 몫',
    file: 'lib/health-insurance-local.ts',
    needle: 'export const EMPLOYEE_SHARE = 0.5;',
    kind: 'rule',
    asOf: 2026,
    source: '국민건강보험법 — 직장가입자의 보험료 부담',
    note: '요율은 lib/salary.ts를 돌려 되짚어 꺼내므로 이 파일에 숫자가 없다. 최저·최고 보험료와 부과점수당 금액은 고시라 입력으로 받는다.',
  },
  {
    label: '학자금 취업 후 상환 계산의 지평(60년)',
    file: 'lib/student-loan.ts',
    needle: 'export const MAX_YEARS = 60;',
    kind: 'ours',
    asOf: 2026,
    source: '없음 — 고시된 값이 아니라 무한 반복을 막는 계산의 지평',
    note: '상환기준소득·상환율·금리는 해마다(금리는 반기마다) 고시되어 전부 입력이다.',
  },

  {
    label: '종합부동산세 세율표와 기본공제',
    file: 'lib/holding-tax.ts',
    needle: 'export const JONGBU_BRACKETS',
    kind: 'rule',
    asOf: 2026,
    source: '종합부동산세법 제9조 · 제8조(과세표준)',
    note: '2026-08-12에 페이지 안에서 끌어냈다. 그때까지 초과누진이 아니라 전체 과세표준에 한 세율을 곱해, 3억 경계에서 세금이 60만원 뛰고 20억에서 600만원을 과다 계산했다.',
  },
  {
    label: '상속세 공제 (일괄·배우자·금융재산)',
    file: 'lib/inheritance-tax.ts',
    needle: 'LUMP_DEDUCTION',
    kind: 'rule',
    asOf: 2026,
    source: '상속세 및 증여세법',
    note: '세율표는 증여세와 같은 객체를 쓴다(사본 금지 — 검사가 참조를 본다). 배우자 법정상속분은 lib/inheritance-share.ts에서 가져온다. 2026-08-13에 금융재산공제를 계단으로 고치고 배우자 50% 어림을 없앴다.',
  },
  {
    label: '월세 세액공제 대상 월세액 연 한도',
    file: 'lib/monthly-rent-deduction.ts',
    needle: 'RENT_LIMIT = 10_000_000',
    kind: 'rule',
    asOf: 2026,
    source: '조세특례제한법 제95조의2 · 국세청 연말정산 안내',
    note: '750만원이던 이력이 있다. 공제율(17%/15%)과 총급여 경계(5,500만)·상한(8,000만)이 같은 파일에 있고, 화면에서 직접 고칠 수 있게 열어 두었다.',
  },
  {
    label: '월세 세액공제율과 총급여 구간',
    file: 'lib/monthly-rent-deduction.ts',
    needle: 'incomeUpTo: 45_000_000, rate: 0.17',
    kind: 'rule',
    asOf: 2026,
    source: '조세특례제한법 제95조의2',
    note: '구간마다 단일율이라 총급여 5,500만원에서 1원 넘으면 공제액이 20만원 떨어진다 — 이 절벽은 옳다(초과누진이 아니다). 상한은 7,000만 → 8,000만원으로 오른 이력이 있다.',
  },
  {
    label: '현금영수증 소득공제율 (월세 비교용)',
    file: 'lib/monthly-rent-deduction.ts',
    needle: 'CASH_RECEIPT_RATE = 0.30',
    kind: 'rule',
    asOf: 2026,
    source: '소득세법 제52조',
    note: 'lib/card-deduction.ts의 현금·체크 요율과 같아야 하고, 두 값을 대조하는 검사가 있다.',
  },
  {
    label: '중개보수 상한요율표·환산보증금 규칙',
    file: 'lib/broker-fee.ts',
    needle: 'LOW_RENT_MULTIPLIER = 70',
    kind: 'rule',
    asOf: 2026,
    source: '공인중개사법 시행규칙 별표 · 지자체 조례',
    note: '구간 경계 금액은 위 구간에 속한다(「X 이상 ~ Y 미만」) — 2026-08-13에 그 경계가 한 칸 밀려 있던 것을 고쳤다. 조례로 지자체마다 다를 수 있다.',
  },
  {
    label: '교통 범칙금·과태료 벌점 기준',
    file: 'lib/traffic-fine.ts',
    needle: 'SUSPEND_POINTS = 40',
    kind: 'rule',
    asOf: 2026,
    source: '도로교통법 시행규칙 별표',
    note: '누산 40점 정지·정지 일수 = 누산 점수. 금액과 사전납부 감액률·가산금률은 코드에 박지 않고 입력으로 받는다(통지서 값이 이긴다).',
  },
  {
    label: '전월세 환산 배수 (전월세전환율)',
    file: 'lib/deposit-conversion.ts',
    needle: 'RENT_MULTIPLIER = 100',
    kind: 'rule',
    asOf: 2026,
    source: '주택임대차보호법 시행령 — 월차임 전환 산정률',
    note: '중개보수의 환산보증금 배수(lib/broker-fee.ts)와 뜻이 다르다 — 한쪽을 고칠 때 다른 쪽을 따라 고치지 않도록 주의한다.',
  },
  {
    label: '법정상속분 배우자 가산',
    file: 'lib/inheritance-share.ts',
    needle: 'SPOUSE_WEIGHT = 1.5',
    kind: 'rule',
    asOf: 2026,
    source: '민법 제1009조',
    note: '상속세 계산기(lib/inheritance-tax.ts)의 배우자 공제 한도도 이 값에서 나온다 — 사본을 만들지 않는다.',
  },
  {
    label: '국민연금 보험료율 (추납·임의가입)',
    file: 'lib/pension-catchup.ts',
    needle: 'CONTRIBUTION_RATE = 0.09',
    kind: 'yearly',
    asOf: 2026,
    source: '국민연금법 — 보험료율',
    note: '직장가입자는 회사와 반씩(lib/salary.ts의 4.5%), 추납·임의가입은 전액이다. 요율이 바뀌면 두 곳을 함께 본다. 추납 한도 119개월도 이 파일에 있다.',
  },
  {
    label: '증여세 세율표·증여재산공제',
    file: 'lib/gift-tax.ts',
    needle: 'GIFT_BRACKETS',
    kind: 'rule',
    asOf: 2026,
    source: '상속세 및 증여세법',
    note: '누진공제액이 세율과 맞물려 있어 한쪽만 고치면 조용히 틀린다 — 검사가 초과누진으로 되짚는다. 혼인·출산 공제 1억원과 신고세액공제 3%도 이 파일에 있다. 2026-08-13에 셈을 클라이언트 페이지에서 옮기며 기납부세액 공제 누락을 고쳤다.',
  },
  {
    label: '종부세 공정시장가액비율',
    file: 'lib/holding-tax.ts',
    needle: 'export const JONGBU_FAIR_RATE',
    kind: 'yearly',
    asOf: 2026,
    source: '종합부동산세법 시행령',
    note: '기본공제 12억·9억도 함께 확인한다. 재산세 쪽 비율은 lib/property-tax.ts에 따로 있다.',
  },
  {
    label: '재산세 공정시장가액비율과 세율표',
    file: 'lib/property-tax.ts',
    needle: 'ONE_HOUSE_FAIR_RATES',
    kind: 'yearly',
    asOf: 2026,
    source: '지방세법 · 지방세법 시행령',
    note: '1주택 특례(45·50%)가 해마다 손질된다. 누진세율표·도시지역분 0.14%·지방교육세 20%도 이 파일에 함께 있다. 2026-08-13에 재산세 계산기 페이지와 lib/holding-tax.ts에 두 벌로 있던 표를 이 파일 하나로 모았다.',
  },
  {
    label: '적금 이자소득세율',
    file: 'lib/savings.ts',
    needle: 'WITHHOLDING_RATE',
    kind: 'rule',
    asOf: 2026,
    source: '소득세법 — lib/interest-tax.ts의 요율을 가져온다',
    note: '2026-08-12에 페이지 안에서 끌어냈다. 15.4%를 두 곳에 적지 않도록 lib/interest-tax.ts만 본다.',
  },
  /* ── 우리가 정한 기준 (법이 정한 것이 아니다) ── */
  {
    label: '전세 안전도 "안전" 등급의 부채비율 상한',
    file: 'lib/jeonse-safety.ts',
    needle: 'SAFE_DEBT_RATIO',
    kind: 'ours',
    asOf: 2026,
    source: '없음 — 이 계산기가 정한 어림 기준',
    note: '법이나 고시가 정한 선이 아니다. 화면에도 그렇게 밝혀 두었다.',
  },
  {
    label: '에어컨 용도별 냉방 계수와 판매 용량 계단',
    file: 'lib/aircon-capacity.ts',
    needle: 'SQM_PER_PYEONG',
    kind: 'ours',
    asOf: 2026,
    source: '없음 — 흔히 파는 용량과 어림 계수',
    note: '제조사 표기가 바뀌면 계단도 손봐야 한다.',
  },
];

/** 해마다 확인해야 하는 것만 */
export const yearlyOnly = (): YearlyValue[] => YEARLY_VALUES.filter(v => v.kind === 'yearly');

/** 가장 오래된 기준 연도 — 이것이 올해보다 많이 뒤면 점검할 때가 됐다는 뜻이다 */
export const oldestAsOf = (): number => Math.min(...YEARLY_VALUES.map(v => v.asOf));
