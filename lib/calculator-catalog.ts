/**
 * 계산기 카탈로그 — 인덱스 페이지와 "관련 계산기" 추천에서 공용으로 사용.
 */
export type CalcItem = { href: string; title: string; desc: string; hot?: boolean };
export type CalcCategory = {
  id: string;
  label: string;
  icon: string;
  desc: string;
  accent: string;
  calcs: CalcItem[];
};

export const CATS: CalcCategory[] = [
  {
    id: 'worker', label: '직장인', icon: '👔',
    desc: '급여·수당·보험 관련 계산기',
    accent: 'bg-blue-50 text-blue-700 border-blue-200',
    calcs: [
      { href:'/calculator/salary',          title:'실수령액 계산기',      desc:'연봉 → 공제 후 월 실수령액', hot:true },
      { href:'/calculator/weekly-holiday',  title:'주휴수당 계산기',      desc:'시급·주 근무시간 → 주휴수당·월급' },
      { href:'/calculator/annual-leave-pay',title:'연차수당 계산기',      desc:'월급·미사용 연차 → 연차수당' },
      { href:'/calculator/four-insurance',  title:'4대보험 계산기',       desc:'월급 → 4대보험 상세 내역' },
      { href:'/calculator/minimum-wage',    title:'최저시급 월급 계산기', desc:'2026년 최저시급 기준 월급' },
      { href:'/calculator/parttime',        title:'알바 급여 계산기',     desc:'시급·근무일수 → 주급·월급' },
      { href:'/calculator/overtime',        title:'야근수당 계산기',      desc:'통상시급·야근시간 → 연장수당' },
      { href:'/calculator/to-hourly',       title:'시급 계산기',          desc:'월급 → 시급 환산' },
      { href:'/calculator/to-annual',       title:'연봉 계산기',          desc:'월급 → 연봉 환산' },
      { href:'/calculator/standard-wage',   title:'통상임금 계산기',      desc:'기본급·고정수당 → 통상임금' },
      { href:'/calculator/severance',        title:'퇴직금 계산기',        desc:'평균임금+상여+연차 → 법령기준 퇴직금' },
      { href:'/calculator/unemployment',     title:'실업급여 계산기',      desc:'평균임금·가입기간 → 구직급여 예상액', hot:true },
      { href:'/calculator/parental-leave',   title:'육아휴직 급여 계산기', desc:'통상임금 → 육아휴직 급여 예상액', hot:true },
    ],
  },
  {
    id: 'tax', label: '세금', icon: '🧾',
    desc: '각종 세금 계산기',
    accent: 'bg-amber-50 text-amber-700 border-amber-200',
    calcs: [
      { href:'/calculator/freelance',         title:'프리랜서 세금 계산기', desc:'수입 → 3.3% 원천징수', hot:true },
      { href:'/calculator/vat',               title:'부가세 계산기',         desc:'공급가액 ↔ 부가가치세 계산' },
      { href:'/calculator/business-income',   title:'사업소득세 계산기',     desc:'사업소득 → 예상 세금' },
      { href:'/calculator/comprehensive-tax', title:'종합소득세 계산기',     desc:'연소득 → 예상 종합소득세' },
      { href:'/calculator/capital-gains',     title:'양도소득세 계산기',     desc:'취득가·양도가 → 예상 세금' },
      { href:'/calculator/gift-tax',          title:'증여세 계산기',         desc:'증여금액·관계 → 예상 증여세' },
      { href:'/calculator/inheritance-tax',   title:'상속세 계산기',         desc:'상속재산 → 예상 상속세' },
      { href:'/calculator/local-income-tax',  title:'지방소득세 계산기',     desc:'소득세 → 지방소득세 계산' },
    ],
  },
  {
    id: 'finance', label: '금융', icon: '📈',
    desc: '투자·저축·대출 계산기',
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    calcs: [
      { href:'/calculator/compound',       title:'복리 계산기',           desc:'월복리·분기·연복리 + 연도별 테이블', hot:true },
      { href:'/calculator/loan',           title:'대출 이자 계산기',       desc:'원리금균등·원금균등 + 상환 스케줄' },
      { href:'/calculator/deposit',        title:'예금 이자 계산기',       desc:'예치금·금리·기간 → 이자' },
      { href:'/calculator/savings',        title:'적금 계산기',            desc:'월 납입금·금리 → 만기금액' },
      { href:'/calculator/simple-interest',title:'단리 계산기',            desc:'원금·이율·기간 → 단리 이자' },
      { href:'/calculator/roi',            title:'투자 수익률 계산기',     desc:'매수·매도 금액 → 수익률' },
      { href:'/calculator/avg-price',      title:'평균단가 계산기',        desc:'여러 번 매수 → 평균 단가' },
      { href:'/calculator/breakeven',      title:'손익분기점 계산기',      desc:'수수료 포함 손익분기점' },
      { href:'/calculator/compound-goal',  title:'복리 목표 계산기',       desc:'목표 금액까지 필요한 기간' },
      { href:'/calculator/dividend',       title:'배당금 계산기',          desc:'배당수익률 → 예상 배당금' },
      { href:'/calculator/inflation',      title:'물가상승률 계산기',      desc:'금액·기간 → 실질 구매력' },
      { href:'/calculator/retirement',     title:'은퇴자금 계산기',        desc:'현재 저축 + 월적립 → 은퇴 자산' },
      { href:'/calculator/max-loan',       title:'대출 가능 금액 계산기',  desc:'소득 기준 최대 대출 금액' },
      { href:'/calculator/dsr',            title:'DSR 계산기',             desc:'대출 상환 능력 비율 계산' },
      { href:'/calculator/ltv',            title:'LTV 계산기',             desc:'담보인정비율 계산' },
      { href:'/calculator/exchange',       title:'환율 계산기',            desc:'실시간 API · 주요 통화 변환' },
    ],
  },
  {
    id: 'realestate', label: '부동산', icon: '🏠',
    desc: '부동산 거래·세금 계산기',
    accent: 'bg-violet-50 text-violet-700 border-violet-200',
    calcs: [
      { href:'/calculator/pyeong',              title:'평수 계산기',        desc:'평 ↔ 제곱미터 변환' },
      { href:'/calculator/broker-fee',          title:'중개수수료 계산기',  desc:'거래금액 → 중개보수' },
      { href:'/calculator/jeonwolse',           title:'전월세 전환 계산기', desc:'전세 ↔ 월세 환산' },
      { href:'/calculator/acquisition-tax',     title:'취득세 계산기',      desc:'부동산 취득세 계산' },
      { href:'/calculator/property-tax',        title:'재산세 계산기',      desc:'재산세 예상 계산' },
      { href:'/calculator/holding-tax',         title:'보유세 계산기',      desc:'종부세 포함 보유세' },
      { href:'/calculator/subscription-score',  title:'청약 가점 계산기',   desc:'무주택기간·부양가족 → 가점' },
    ],
  },
  {
    id: 'life', label: '생활', icon: '🌿',
    desc: '일상생활 편의 계산기',
    accent: 'bg-teal-50 text-teal-700 border-teal-200',
    calcs: [
      { href:'/calculator/bmi',            title:'BMI 계산기',         desc:'키·몸무게 → BMI + 표준체중' },
      { href:'/calculator/body-fat',       title:'체지방률 계산기',    desc:'해군 공식 기반 체지방률 계산' },
      { href:'/calculator/bmr',            title:'기초대사량 계산기',  desc:'BMR (Harris-Benedict) 계산' },
      { href:'/calculator/calorie',        title:'칼로리 계산기',      desc:'활동 수준별 권장 칼로리' },
      { href:'/calculator/calories-burn',  title:'운동 칼로리 계산기', desc:'운동 종류·시간·체중 → 소모 칼로리' },
      { href:'/calculator/water',          title:'물 섭취량 계산기',   desc:'체중 기준 권장 수분 섭취량' },
      { href:'/calculator/blood-pressure', title:'혈압 체크기',        desc:'수축기·이완기 → WHO 기준 등급' },
      { href:'/calculator/sleep',          title:'수면 계산기',        desc:'기상시간 기준 취침시간 추천' },
      { href:'/calculator/ovulation',      title:'배란일 계산기',      desc:'마지막 생리일 → 배란일·가임기' },
      { href:'/calculator/pregnancy',      title:'임신 예정일 계산기', desc:'마지막 생리일 → 출산 예정일' },
      { href:'/calculator/dday',           title:'D-day 계산기',       desc:'목표일 D-day · 날짜 간격' },
      { href:'/calculator/age',            title:'나이 계산기',        desc:'만나이·한국나이 계산' },
      { href:'/calculator/birthday',       title:'생년월일 계산기',    desc:'요일·출생일 기준 계산' },
      { href:'/calculator/time-diff',      title:'시간 계산기',        desc:'두 시각 차이 · 시간 더하기' },
      { href:'/calculator/percent',        title:'퍼센트 계산기',      desc:'증가율·감소율·비율 계산' },
      { href:'/calculator/discount',       title:'할인 계산기',        desc:'정가·할인율 → 할인가 · 역산' },
      { href:'/calculator/tip',            title:'팁 계산기',          desc:'금액·팁율·인원수 → 1인당 팁' },
      { href:'/calculator/dutch-pay',      title:'더치페이 계산기',    desc:'총액·인원수 → 각자 부담액' },
      { href:'/calculator/gpa',            title:'학점/GPA 계산기',    desc:'과목별 성적 → 평균 학점' },
    ],
  },
  {
    id: 'car', label: '자동차', icon: '🚗',
    desc: '자동차 관련 계산기',
    accent: 'bg-orange-50 text-orange-700 border-orange-200',
    calcs: [
      { href:'/calculator/car-installment', title:'자동차 할부 계산기',  desc:'차량가·금리·기간 → 월 할부금' },
      { href:'/calculator/car-tax',         title:'자동차세 계산기',     desc:'배기량 기준 자동차세' },
      { href:'/calculator/fuel-efficiency', title:'연비 계산기',          desc:'주행거리·연료량 → 연비' },
      { href:'/calculator/gas-cost',        title:'주유비 계산기',        desc:'거리·연비·유가 → 주유비' },
      { href:'/calculator/ev-charge',       title:'전기차 충전비 계산기', desc:'배터리·충전량 → 충전 비용' },
    ],
  },
  {
    id: 'utility', label: '공과금', icon: '💡',
    desc: '전기·가스·수도요금 계산기',
    accent: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    calcs: [
      { href:'/calculator/electricity', title:'전기요금 계산기', desc:'kWh 기준 누진요금 계산' },
      { href:'/calculator/gas-bill',    title:'가스요금 계산기', desc:'사용량 기준 도시가스요금' },
      { href:'/calculator/water-bill',  title:'수도요금 계산기', desc:'사용량 기준 수도요금 계산' },
    ],
  },
  {
    id: 'math', label: '단위변환', icon: '🔢',
    desc: '길이·무게·온도·진수 변환',
    accent: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    calcs: [
      { href:'/calculator/unit-length', title:'길이 단위 변환기', desc:'mm·cm·m·km·inch·feet·mile 변환' },
      { href:'/calculator/unit-weight', title:'무게 단위 변환기', desc:'mg·g·kg·t·lb·oz·근 변환' },
      { href:'/calculator/unit-temp',   title:'온도 변환기',      desc:'°C·°F·K·°R 상호 변환' },
      { href:'/calculator/binary',      title:'진수 변환기',      desc:'2·8·10·16진수 상호 변환' },
    ],
  },
  {
    id: 'dev', label: '개발자', icon: '💻',
    desc: '개발자를 위한 도구 모음',
    accent: 'bg-slate-100 text-slate-700 border-slate-300',
    calcs: [
      { href:'/calculator/dev/json',       title:'JSON Formatter',         desc:'JSON 정렬·검증·복사' },
      { href:'/calculator/dev/base64',     title:'Base64 변환기',          desc:'Base64 인코딩·디코딩' },
      { href:'/calculator/dev/url-encode', title:'URL 인코딩 변환기',      desc:'URL 인코딩·디코딩' },
      { href:'/calculator/dev/timestamp',  title:'Unix Timestamp 변환기',  desc:'날짜 ↔ Timestamp 변환' },
      { href:'/calculator/dev/jwt',        title:'JWT Decoder',            desc:'JWT Payload 파싱·확인' },
      { href:'/calculator/dev/hash',       title:'SHA256 / SHA512 생성기', desc:'해시 생성 도구' },
      { href:'/calculator/dev/regex',      title:'Regex Tester',           desc:'정규식 실시간 테스트' },
      { href:'/calculator/dev/uuid',       title:'UUID Generator',         desc:'v4 UUID 생성' },
      { href:'/calculator/dev/color',      title:'Color Converter',        desc:'HEX ↔ RGB ↔ HSL 변환' },
      { href:'/calculator/dev/cron',       title:'Cron 표현식 생성기',     desc:'Cron Expression 작성·검증' },
      { href:'/calculator/dev/sql',        title:'SQL Formatter',          desc:'SQL 정렬·들여쓰기' },
      { href:'/calculator/dev/salary',     title:'개발자 연봉 계산기',     desc:'연봉 ↔ 월급 ↔ 시급 변환' },
      { href:'/calculator/dev/word-count', title:'글자수 카운터',          desc:'글자수·단어수·바이트 실시간 계산' },
      { href:'/calculator/dev/diff',       title:'텍스트 비교 (Diff)',     desc:'두 텍스트 줄 단위 차이 비교' },
    ],
  },
];

/** 현재 경로(href)가 속한 카테고리를 찾는다. */
export function findCategory(href: string): CalcCategory | undefined {
  return CATS.find((c) => c.calcs.some((calc) => calc.href === href));
}

/** 같은 카테고리의 다른 계산기를 추천한다. 부족하면 인기 계산기로 채운다. */
export function getRelatedCalcs(href: string, limit = 6): CalcItem[] {
  const cat = findCategory(href);
  const related = cat ? cat.calcs.filter((c) => c.href !== href) : [];
  if (related.length >= limit) return related.slice(0, limit);

  // 같은 카테고리가 부족하면 인기(hot) 계산기로 보충
  const hot = CATS.flatMap((c) => c.calcs).filter(
    (c) => c.hot && c.href !== href && !related.some((r) => r.href === c.href)
  );
  return [...related, ...hot].slice(0, limit);
}
