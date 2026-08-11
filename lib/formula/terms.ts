/**
 * 공식 도구가 공유하는 용어 사전(3언어).
 *
 * 입력 라벨을 도구마다 따로 번역하면 같은 개념이 페이지마다 다른 말로 나온다 —
 * "원가"가 어디선 cost, 어디선 original price가 되는 식이다. 개념 하나에 이름
 * 하나를 정해 두고 도구는 키만 참조한다.
 *
 * 통화 기호도 여기서 갈린다. 한국어는 '원', 영어는 통화 중립으로 비워 두고,
 * 중국어는 '元'을 쓴다 — 계산 자체는 통화와 무관하다.
 */
import { BODY_TERMS, BODY_UNITS } from './terms-body.ts';
import { BODY2_TERMS, BODY2_UNITS } from './terms-body2.ts';
import { BODY3_TERMS } from './terms-body3.ts';
import { GEO_TERMS, GEO_UNITS } from './terms-geo.ts';
import { GEO2_TERMS, GEO2_UNITS } from './terms-geo2.ts';
import { GEO3_TERMS } from './terms-geo3.ts';
import { RATE_TERMS, RATE_UNITS } from './terms-rate.ts';
import { RATE2_TERMS } from './terms-rate2.ts';
import { CRAFT_TERMS, CRAFT_UNITS } from './terms-craft.ts';
import { CRAFT2_TERMS, CRAFT2_UNITS } from './terms-craft2.ts';
import { CRAFT3_TERMS, CRAFT3_UNITS } from './terms-craft3.ts';
import { CRAFT4_TERMS, CRAFT4_UNITS } from './terms-craft4.ts';
import { GEO4_TERMS, GEO4_UNITS } from './terms-geo4.ts';
import { RATE3_TERMS, RATE3_UNITS } from './terms-rate3.ts';
import { BODY4_TERMS, BODY4_UNITS } from './terms-body4.ts';
import { RATE4_TERMS, RATE4_UNITS } from './terms-rate4.ts';
import { CRAFT5_TERMS, CRAFT5_UNITS } from './terms-craft5.ts';
import { FORMULA_L10N } from './l10n/index.ts';
import type { AnyLocale10 } from '../locales.ts';

/**
 * 나라 정보·사자성어가 아직 두 언어라 Lang은 그대로 둔다.
 * 공식 도구는 열 언어이므로 FormulaLang을 따로 쓴다.
 */
export type Lang = 'ko' | 'en';
export type FormulaLang = AnyLocale10;

export interface Term { ko: string; en: string }


const CORE_TERMS: Record<string, Term> = {
  price:        { ko: '가격',        en: 'Price' },
  cost:         { ko: '원가',        en: 'Cost' },
  listPrice:    { ko: '정가',        en: 'List price' },
  salePrice:    { ko: '판매가',      en: 'Sale price' },
  finalPrice:   { ko: '최종 가격',   en: 'Final price' },
  amount:       { ko: '금액',        en: 'Amount' },
  discountAmt:  { ko: '할인액',      en: 'Discount' },
  profit:       { ko: '이익',        en: 'Profit' },
  marginRate:   { ko: '이익률',      en: 'Margin' },
  markup:       { ko: '원가 대비',   en: 'Markup' },
  vat:          { ko: '부가세',      en: 'VAT' },
  supply:       { ko: '공급가액',    en: 'Net amount' },
  total:        { ko: '합계',        en: 'Total' },
  tip:          { ko: '팁',          en: 'Tip' },
  perPerson:    { ko: '1인당',       en: 'Per person' },

  percent:      { ko: '비율',        en: 'Percentage' },
  rate:         { ko: '요율',        en: 'Rate' },
  before:       { ko: '이전 값',     en: 'Before' },
  after:        { ko: '이후 값',     en: 'After' },
  change:       { ko: '변화율',      en: 'Change' },
  diff:         { ko: '차이',        en: 'Difference' },
  part:         { ko: '부분',        en: 'Part' },
  whole:        { ko: '전체',        en: 'Whole' },
  ratioA:       { ko: 'A',           en: 'A' },
  ratioB:       { ko: 'B',           en: 'B' },
  shareA:       { ko: 'A의 몫',      en: "A's share" },
  shareB:       { ko: 'B의 몫',      en: "B's share" },

  principal:    { ko: '원금',        en: 'Principal' },
  annualRate:   { ko: '연이율',      en: 'Annual rate' },
  years:        { ko: '기간(년)',    en: 'Years' },
  months:       { ko: '기간(개월)',  en: 'Months' },
  interest:     { ko: '이자',        en: 'Interest' },
  maturity:     { ko: '만기 금액',   en: 'Final amount' },
  monthlyPay:   { ko: '월 상환액',   en: 'Monthly payment' },
  invested:     { ko: '투자금',      en: 'Invested' },
  returned:     { ko: '회수금',      en: 'Returned' },
  roi:          { ko: '수익률',      en: 'Return' },
  doubleYears:  { ko: '2배 되는 기간', en: 'Years to double' },

  solute:       { ko: '용질(g)',     en: 'Solute (g)' },
  solvent:      { ko: '용매(g)',     en: 'Solvent (g)' },
  solution:     { ko: '용액(g)',     en: 'Solution (g)' },
  concentration:{ ko: '농도',        en: 'Concentration' },
  targetConc:   { ko: '목표 농도',   en: 'Target %' },
  addWater:     { ko: '넣을 물',     en: 'Water to add' },
  addSolute:    { ko: '넣을 용질',   en: 'Solute to add' },

  count:        { ko: '개수',        en: 'Count' },
  people:       { ko: '인원',        en: 'People' },
  scaleReal:    { ko: '실제 거리',   en: 'Real distance' },
  scaleMap:     { ko: '도면 거리',   en: 'Map distance' },
  scaleDenom:   { ko: '축척 분모',   en: 'Scale 1 : n' },
  score:        { ko: '점수',        en: 'Score' },
  maxScore:     { ko: '만점',        en: 'Max score' },
  weightKg:     { ko: '무게(kg)',    en: 'Weight (kg)' },
  volumeMl:     { ko: '용량(ml)',    en: 'Volume (mL)' },
  result:       { ko: '결과',        en: 'Result' },
  taxAmt:       { ko: '세액',        en: 'Tax' },
  netPay:       { ko: '실수령액',    en: 'Net amount' },
  grossPay:     { ko: '세전 금액',   en: 'Gross amount' },
  effRate:      { ko: '실효세율',    en: 'Effective rate' },
  feeAmt:       { ko: '수수료',      en: 'Fee' },
  settle:       { ko: '정산액',      en: 'Payout' },
  cagr:         { ko: '연평균 성장률', en: 'CAGR' },
  percentA:     { ko: 'A 비율',      en: 'A share' },
  percentB:     { ko: 'B 비율',      en: 'B share' },
  totalGrowth:  { ko: '총 성장률',   en: 'Total growth' },
  pointDiff:    { ko: '퍼센트포인트', en: 'Points' },
  original:     { ko: '원래 값',     en: 'Original' },
  unknown:      { ko: '구할 값',     en: 'Unknown' },
  monthlyDeposit:{ ko: '월 납입액',  en: 'Monthly deposit' },
  totalPaid:    { ko: '총 상환액',   en: 'Total repaid' },
  totalDeposit: { ko: '총 납입액',   en: 'Total deposited' },
  netInterest:  { ko: '세후 이자',   en: 'Interest after tax' },
  realRate:     { ko: '실질 이자율', en: 'Real rate' },
  neededRise:   { ko: '필요 상승률', en: 'Rise needed' },
  annualized:   { ko: '연환산 수익률', en: 'Annualised' },
  lossRate:     { ko: '하락률',      en: 'Drop' },
  holdDays:     { ko: '보유 기간(일)', en: 'Days held' },
  inflation:    { ko: '물가 상승률', en: 'Inflation' },
  nominalRate:  { ko: '명목 이자율', en: 'Nominal rate' },
  perLiterMl:   { ko: '물 1L당',    en: 'Per litre' },
  foldRate:     { ko: '희석 배율',   en: 'Dilution factor' },
  volumeL:      { ko: '만들 양(L)',  en: 'Batch size (L)' },
  stockMl:      { ko: '원액(ml)',    en: 'Stock (mL)' },
  ppmValue:     { ko: 'ppm',         en: 'ppm' },
  mgPerL:       { ko: 'mg/L',        en: 'mg/L' },
  wins:         { ko: '승',          en: 'Wins' },
  losses:       { ko: '패',          en: 'Losses' },
  games:        { ko: '경기 수',     en: 'Games' },
  winRate:      { ko: '승률',        en: 'Win rate' },
  sessions:     { ko: '전체 횟수',   en: 'Total sessions' },
  attended:     { ko: '참석 횟수',   en: 'Attended' },
  attendRate:   { ko: '출석률',      en: 'Attendance' },
  canMiss:      { ko: '더 빠질 수 있는 횟수', en: 'Absences left' },
  actual:       { ko: '실적',        en: 'Actual' },
  grade:        { ko: '백분위',      en: 'Percentile' },
  base:         { ko: '기준값',      en: 'Base' },
  target:       { ko: '목표값',      en: 'Target' },
  achieved:     { ko: '달성률',      en: 'Achieved' },
  remaining:    { ko: '남은 양',     en: 'Remaining' },
};

/** 단위 라벨 — 통화처럼 언어마다 다른 것들 */
const CORE_UNITS: Record<string, Term> = {
  money:   { ko: '원',   en: '' },
  percent: { ko: '%',    en: '%' },
  gram:    { ko: 'g',    en: 'g' },
  ml:      { ko: 'ml',   en: 'mL' },
  times:   { ko: '배',   en: '×' },
  people:  { ko: '명',   en: '' },
  none:    { ko: '',     en: '' },
  year:    { ko: '년',   en: 'yr' },
  month:   { ko: '개월', en: 'mo' },
  cm:      { ko: 'cm',   en: 'cm' },
  m:       { ko: 'm',    en: 'm' },
  km:      { ko: 'km',   en: 'km' },
};

/* 섹션별 용어는 파일을 나눠 둔다 — 한 파일에 수백 줄이면 무엇이 어디 쓰이는지 보이지 않는다 */
export const TERMS: Record<string, Term> = { ...CORE_TERMS, ...RATE_TERMS, ...BODY_TERMS, ...BODY2_TERMS, ...GEO_TERMS, ...GEO2_TERMS, ...GEO3_TERMS, ...RATE2_TERMS, ...BODY3_TERMS, ...CRAFT_TERMS, ...CRAFT2_TERMS, ...CRAFT3_TERMS, ...CRAFT4_TERMS, ...GEO4_TERMS, ...RATE3_TERMS, ...BODY4_TERMS, ...RATE4_TERMS, ...CRAFT5_TERMS };
export const UNITS: Record<string, Term> = { ...CORE_UNITS, ...RATE_UNITS, ...BODY_UNITS, ...BODY2_UNITS, ...GEO_UNITS, ...GEO2_UNITS, ...CRAFT_UNITS, ...CRAFT2_UNITS, ...CRAFT3_UNITS, ...CRAFT4_UNITS, ...GEO4_UNITS, ...RATE3_UNITS, ...BODY4_UNITS, ...RATE4_UNITS, ...CRAFT5_UNITS };

/**
 * 나머지 여덟 언어는 곁사전에 둔다.
 *
 * 위 표를 열 언어 필수로 바꾸면 562개가 한꺼번에 깨진다. 그래서 ko·en은 그대로
 * 두고 번역은 언어별 파일에서 열쇠로 덧씌운다 — 한 섹션씩 옮겨도 나머지가 안 깨진다.
 * 아직 안 옮긴 열쇠는 영어로 되돌아간다. 화면이 비지는 않지만 그 자리만 영어가
 * 되므로, 섹션을 내보내기 전에 tests/formula-l10n.test.ts가 빠진 것을 센다.
 */
export const term = (key: string, lang: FormulaLang): string => {
  if (lang === 'ko' || lang === 'en') return TERMS[key]?.[lang] ?? key;
  return FORMULA_L10N[lang]?.TERMS[key] ?? TERMS[key]?.en ?? key;
};

export const unitLabel = (key: string, lang: FormulaLang): string => {
  if (!key) return '';
  if (lang === 'ko' || lang === 'en') return UNITS[key]?.[lang] ?? '';
  return FORMULA_L10N[lang]?.UNITS[key] ?? UNITS[key]?.en ?? '';
};
