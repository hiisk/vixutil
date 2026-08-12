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
    label: '최저시급',
    file: 'app/(ko)/calculator/minimum-wage/page.tsx',
    needle: '10_320',
    kind: 'yearly',
    asOf: 2026,
    source: '최저임금위원회 — 최저임금 고시 (전년 8월 고시)',
    note: '월 환산은 209시간 기준. 화면 문구에도 연도와 금액이 함께 적혀 있어 둘을 같이 고쳐야 한다.',
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
