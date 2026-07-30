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
import { GEO_TERMS, GEO_UNITS } from './terms-geo.ts';
import { RATE_TERMS, RATE_UNITS } from './terms-rate.ts';

export type Lang = 'ko' | 'en' | 'zh';

export interface Term { ko: string; en: string; zh: string }


const CORE_TERMS: Record<string, Term> = {
  price:        { ko: '가격',        en: 'Price',            zh: '价格' },
  cost:         { ko: '원가',        en: 'Cost',             zh: '成本' },
  listPrice:    { ko: '정가',        en: 'List price',       zh: '原价' },
  salePrice:    { ko: '판매가',      en: 'Sale price',       zh: '售价' },
  finalPrice:   { ko: '최종 가격',   en: 'Final price',      zh: '最终价格' },
  amount:       { ko: '금액',        en: 'Amount',           zh: '金额' },
  discountAmt:  { ko: '할인액',      en: 'Discount',         zh: '折扣金额' },
  profit:       { ko: '이익',        en: 'Profit',           zh: '利润' },
  marginRate:   { ko: '이익률',      en: 'Margin',           zh: '利润率' },
  markup:       { ko: '원가 대비',   en: 'Markup',           zh: '加价率' },
  vat:          { ko: '부가세',      en: 'VAT',              zh: '增值税' },
  supply:       { ko: '공급가액',    en: 'Net amount',       zh: '不含税金额' },
  total:        { ko: '합계',        en: 'Total',            zh: '合计' },
  tip:          { ko: '팁',          en: 'Tip',              zh: '小费' },
  perPerson:    { ko: '1인당',       en: 'Per person',       zh: '每人' },

  percent:      { ko: '비율',        en: 'Percentage',       zh: '百分比' },
  rate:         { ko: '요율',        en: 'Rate',             zh: '比率' },
  before:       { ko: '이전 값',     en: 'Before',           zh: '之前的值' },
  after:        { ko: '이후 값',     en: 'After',            zh: '之后的值' },
  change:       { ko: '변화율',      en: 'Change',           zh: '变化率' },
  diff:         { ko: '차이',        en: 'Difference',       zh: '差值' },
  part:         { ko: '부분',        en: 'Part',             zh: '部分' },
  whole:        { ko: '전체',        en: 'Whole',            zh: '整体' },
  ratioA:       { ko: 'A',           en: 'A',                zh: 'A' },
  ratioB:       { ko: 'B',           en: 'B',                zh: 'B' },
  shareA:       { ko: 'A의 몫',      en: "A's share",        zh: 'A的份额' },
  shareB:       { ko: 'B의 몫',      en: "B's share",        zh: 'B的份额' },

  principal:    { ko: '원금',        en: 'Principal',        zh: '本金' },
  annualRate:   { ko: '연이율',      en: 'Annual rate',      zh: '年利率' },
  years:        { ko: '기간(년)',    en: 'Years',            zh: '年数' },
  months:       { ko: '기간(개월)',  en: 'Months',           zh: '月数' },
  interest:     { ko: '이자',        en: 'Interest',         zh: '利息' },
  maturity:     { ko: '만기 금액',   en: 'Final amount',     zh: '到期金额' },
  monthlyPay:   { ko: '월 상환액',   en: 'Monthly payment',  zh: '每月还款' },
  invested:     { ko: '투자금',      en: 'Invested',         zh: '投资额' },
  returned:     { ko: '회수금',      en: 'Returned',         zh: '回收额' },
  roi:          { ko: '수익률',      en: 'Return',           zh: '收益率' },
  doubleYears:  { ko: '2배 되는 기간', en: 'Years to double', zh: '翻倍所需年数' },

  solute:       { ko: '용질(g)',     en: 'Solute (g)',       zh: '溶质(克)' },
  solvent:      { ko: '용매(g)',     en: 'Solvent (g)',      zh: '溶剂(克)' },
  solution:     { ko: '용액(g)',     en: 'Solution (g)',     zh: '溶液(克)' },
  concentration:{ ko: '농도',        en: 'Concentration',    zh: '浓度' },
  targetConc:   { ko: '목표 농도',   en: 'Target %',         zh: '目标浓度' },
  addWater:     { ko: '넣을 물',     en: 'Water to add',     zh: '需加水量' },
  addSolute:    { ko: '넣을 용질',   en: 'Solute to add',    zh: '需加溶质' },

  count:        { ko: '개수',        en: 'Count',            zh: '数量' },
  people:       { ko: '인원',        en: 'People',           zh: '人数' },
  scaleReal:    { ko: '실제 거리',   en: 'Real distance',    zh: '实际距离' },
  scaleMap:     { ko: '도면 거리',   en: 'Map distance',     zh: '图上距离' },
  scaleDenom:   { ko: '축척 분모',   en: 'Scale 1 : n',      zh: '比例尺 1 : n' },
  score:        { ko: '점수',        en: 'Score',            zh: '分数' },
  maxScore:     { ko: '만점',        en: 'Max score',        zh: '满分' },
  weightKg:     { ko: '무게(kg)',    en: 'Weight (kg)',      zh: '重量(公斤)' },
  volumeMl:     { ko: '용량(ml)',    en: 'Volume (mL)',      zh: '容量(毫升)' },
  result:       { ko: '결과',        en: 'Result',           zh: '结果' },
  taxAmt:       { ko: '세액',        en: 'Tax',              zh: '税额' },
  netPay:       { ko: '실수령액',    en: 'Net amount',       zh: '实收金额' },
  grossPay:     { ko: '세전 금액',   en: 'Gross amount',     zh: '税前金额' },
  effRate:      { ko: '실효세율',    en: 'Effective rate',   zh: '实际税率' },
  feeAmt:       { ko: '수수료',      en: 'Fee',              zh: '手续费' },
  settle:       { ko: '정산액',      en: 'Payout',           zh: '结算金额' },
  cagr:         { ko: '연평균 성장률', en: 'CAGR',           zh: '年均增长率' },
  percentA:     { ko: 'A 비율',      en: 'A share',          zh: 'A占比' },
  percentB:     { ko: 'B 비율',      en: 'B share',          zh: 'B占比' },
  totalGrowth:  { ko: '총 성장률',   en: 'Total growth',     zh: '总增长率' },
  pointDiff:    { ko: '퍼센트포인트', en: 'Points',          zh: '百分点' },
  original:     { ko: '원래 값',     en: 'Original',         zh: '原始值' },
  unknown:      { ko: '구할 값',     en: 'Unknown',          zh: '未知项' },
  monthlyDeposit:{ ko: '월 납입액',  en: 'Monthly deposit',  zh: '每月存入' },
  totalPaid:    { ko: '총 상환액',   en: 'Total repaid',     zh: '还款总额' },
  totalDeposit: { ko: '총 납입액',   en: 'Total deposited',  zh: '存入总额' },
  netInterest:  { ko: '세후 이자',   en: 'Interest after tax', zh: '税后利息' },
  realRate:     { ko: '실질 이자율', en: 'Real rate',        zh: '实际利率' },
  neededRise:   { ko: '필요 상승률', en: 'Rise needed',      zh: '所需涨幅' },
  annualized:   { ko: '연환산 수익률', en: 'Annualised',     zh: '年化收益率' },
  lossRate:     { ko: '하락률',      en: 'Drop',             zh: '跌幅' },
  holdDays:     { ko: '보유 기간(일)', en: 'Days held',      zh: '持有天数' },
  inflation:    { ko: '물가 상승률', en: 'Inflation',        zh: '通胀率' },
  nominalRate:  { ko: '명목 이자율', en: 'Nominal rate',     zh: '名义利率' },
  perLiterMl:   { ko: '물 1L당',    en: 'Per litre',        zh: '每升水' },
  foldRate:     { ko: '희석 배율',   en: 'Dilution factor',  zh: '稀释倍数' },
  volumeL:      { ko: '만들 양(L)',  en: 'Batch size (L)',   zh: '配制量(升)' },
  stockMl:      { ko: '원액(ml)',    en: 'Stock (mL)',       zh: '原液(毫升)' },
  ppmValue:     { ko: 'ppm',         en: 'ppm',              zh: 'ppm' },
  mgPerL:       { ko: 'mg/L',        en: 'mg/L',             zh: '毫克/升' },
  wins:         { ko: '승',          en: 'Wins',             zh: '胜' },
  losses:       { ko: '패',          en: 'Losses',           zh: '负' },
  games:        { ko: '경기 수',     en: 'Games',            zh: '场次' },
  winRate:      { ko: '승률',        en: 'Win rate',         zh: '胜率' },
  sessions:     { ko: '전체 횟수',   en: 'Total sessions',   zh: '总次数' },
  attended:     { ko: '참석 횟수',   en: 'Attended',         zh: '出席次数' },
  attendRate:   { ko: '출석률',      en: 'Attendance',       zh: '出席率' },
  canMiss:      { ko: '더 빠질 수 있는 횟수', en: 'Absences left', zh: '还可缺席次数' },
  actual:       { ko: '실적',        en: 'Actual',           zh: '实际' },
  grade:        { ko: '백분위',      en: 'Percentile',       zh: '百分位' },
  base:         { ko: '기준값',      en: 'Base',             zh: '基准值' },
  target:       { ko: '목표값',      en: 'Target',           zh: '目标值' },
  achieved:     { ko: '달성률',      en: 'Achieved',         zh: '完成率' },
  remaining:    { ko: '남은 양',     en: 'Remaining',        zh: '剩余' },
};

/** 단위 라벨 — 통화처럼 언어마다 다른 것들 */
const CORE_UNITS: Record<string, Term> = {
  money:   { ko: '원',   en: '',      zh: '元' },
  percent: { ko: '%',    en: '%',     zh: '%' },
  gram:    { ko: 'g',    en: 'g',     zh: '克' },
  ml:      { ko: 'ml',   en: 'mL',    zh: '毫升' },
  times:   { ko: '배',   en: '×',     zh: '倍' },
  people:  { ko: '명',   en: '',      zh: '人' },
  none:    { ko: '',     en: '',      zh: '' },
  year:    { ko: '년',   en: 'yr',    zh: '年' },
  month:   { ko: '개월', en: 'mo',    zh: '个月' },
  cm:      { ko: 'cm',   en: 'cm',    zh: '厘米' },
  m:       { ko: 'm',    en: 'm',     zh: '米' },
  km:      { ko: 'km',   en: 'km',    zh: '公里' },
};

/* 섹션별 용어는 파일을 나눠 둔다 — 한 파일에 수백 줄이면 무엇이 어디 쓰이는지 보이지 않는다 */
export const TERMS: Record<string, Term> = { ...CORE_TERMS, ...RATE_TERMS, ...BODY_TERMS, ...BODY2_TERMS, ...GEO_TERMS };
export const UNITS: Record<string, Term> = { ...CORE_UNITS, ...RATE_UNITS, ...BODY_UNITS, ...BODY2_UNITS, ...GEO_UNITS };

export const term = (key: string, lang: Lang): string => TERMS[key]?.[lang] ?? key;
export const unitLabel = (key: string, lang: Lang): string => UNITS[key]?.[lang] ?? '';
