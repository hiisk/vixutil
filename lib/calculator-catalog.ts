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
      { href:'/calculator/annual-leave',    title:'연차 계산기',          desc:'입사일 → 연차 발생일수 (근로기준법)', hot:true },
      { href:'/calculator/four-insurance',  title:'4대보험 계산기',       desc:'월급 → 4대보험 상세 내역' },
      { href:'/calculator/minimum-wage',    title:'최저시급 월급 계산기', desc:'2026년 최저시급 기준 월급' },
      { href:'/calculator/parttime',        title:'알바 급여 계산기',     desc:'시급·근무일수 → 주급·월급' },
      { href:'/calculator/overtime',        title:'야근수당 계산기',      desc:'통상시급·야근시간 → 연장수당' },
      { href:'/calculator/to-hourly',       title:'시급 계산기',          desc:'월급 → 시급 환산' },
      { href:'/calculator/to-annual',       title:'연봉 계산기',          desc:'월급 → 연봉 환산' },
      { href:'/calculator/target-salary',  title:'목표 실수령액 → 연봉',  desc:'월 실수령액 → 필요 연봉 역산', hot:true },
      { href:'/calculator/standard-wage',   title:'통상임금 계산기',      desc:'기본급·고정수당 → 통상임금' },
      { href:'/calculator/severance',        title:'퇴직금 계산기',        desc:'평균임금+상여+연차 → 법령기준 퇴직금' },
      { href:'/calculator/unemployment',     title:'실업급여 계산기',      desc:'평균임금·가입기간 → 구직급여 예상액', hot:true },
      { href:'/calculator/parental-leave',   title:'육아휴직 급여 계산기', desc:'통상임금 → 육아휴직 급여 예상액', hot:true },
      { href:'/calculator/maternity-leave', title:'출산전후휴가 급여 계산기', desc:'90일·다태아 120일 — 유급·무급 구간별 수령액', hot:true },
      { href:'/calculator/work-hours',       title:'근무시간 계산기',      desc:'출퇴근 시각 → 실근무시간·휴게시간' },
      { href:'/calculator/work-hours-209',  title:'소정근로시간 계산기', desc:'209시간과 통상시급·연장수당' },
    ],
  },
  {
    id: 'tax', label: '세금', icon: '🧾',
    desc: '각종 세금 계산기',
    accent: 'bg-amber-50 text-amber-700 border-amber-200',
    calcs: [
      { href:'/calculator/year-end-tax',      title:'연말정산 환급액 계산기', desc:'총급여·공제 → 결정세액과 환급·추가납부', hot:true },
      { href:'/calculator/eitc',           title:'근로장려금 계산기',     desc:'가구 유형·소득 → 근로·자녀장려금 지급액', hot:true },
      { href:'/calculator/health-insurance-dependent', title:'건강보험 피부양자 자격 계산기', desc:'소득·재산·사업자등록 → 자격 유지 여부', hot:true },
      { href:'/calculator/health-insurance-local', title:'지역가입자 건강보험료 계산기', desc:'소득·재산 → 지역 보험료와 직장가입자 비교', hot:true },
      { href:'/calculator/card-deduction',   title:'신용카드 소득공제 계산기', desc:'총급여 25% 문턱 → 공제액과 줄어드는 세금', hot:true },
      { href:'/calculator/monthly-rent-deduction', title:'월세 세액공제 계산기', desc:'월세·총급여 → 공제액과 결정세액 한도·소멸액', hot:true },
      { href:'/calculator/freelance',         title:'프리랜서 세금 계산기', desc:'수입 → 3.3% 원천징수', hot:true },
      { href:'/calculator/vat',               title:'부가세 계산기',         desc:'공급가액 ↔ 부가가치세 계산' },
      { href:'/calculator/business-income',   title:'사업소득세 계산기',     desc:'사업소득 → 예상 세금' },
      { href:'/calculator/comprehensive-tax', title:'종합소득세 계산기',     desc:'연소득 → 예상 종합소득세' },
      { href:'/calculator/capital-gains',     title:'양도소득세 계산기',     desc:'취득가·양도가 → 예상 세금' },
      { href:'/calculator/gift-tax',          title:'증여세 계산기',         desc:'증여금액·관계 → 예상 증여세' },
      { href:'/calculator/inheritance-tax',   title:'상속세 계산기',         desc:'상속재산 → 예상 상속세' },
      { href:'/calculator/inheritance-share', title:'법정상속분 계산기', desc:'상속인 구성 → 각자의 법정상속분·유류분', hot:true },
      { href:'/calculator/local-income-tax',  title:'지방소득세 계산기',     desc:'소득세 → 지방소득세 계산' },
      { href:'/calculator/retirement-income-tax', title:'퇴직소득세 계산기', desc:'퇴직금·근속연수 → 세금·세후 수령액', hot:true },
      { href:'/calculator/rental-income-tax', title:'주택임대소득세 계산기', desc:'연 2천만원 이하 임대수입 분리과세' },
      { href:'/calculator/interest-tax',      title:'이자소득세 계산기',    desc:'예금 이자 15.4% → 세후 실수령' },
      { href:'/calculator/simple-vat',        title:'간이과세 부가세 계산기', desc:'간이과세자 매출 → 예상 부가세' },
      { href:'/calculator/pension-credit',    title:'연금저축·IRP 세액공제 계산기', desc:'연금계좌 납입액 → 연말정산 환급액', hot:true },
    ],
  },
  {
    id: 'pension', label: '연금·복지', icon: '🧓',
    desc: '국민연금·기초연금과 복지 지원 자격 계산기',
    accent: 'bg-rose-50 text-rose-700 border-rose-200',
    calcs: [
      { href:'/calculator/national-pension', title:'국민연금 예상 수령액 계산기', desc:'가입기간·소득 → 월 연금, 조기·연기 비교', hot:true },
      { href:'/calculator/basic-pension',    title:'기초연금 수급 자격 계산기',   desc:'소득·재산 → 소득인정액과 예상 수령액', hot:true },
      { href:'/calculator/median-income', title:'기준 중위소득 계산기', desc:'가구원 수별 기준액 → 생계·의료·주거·교육급여 자격', hot:true },
      { href:'/calculator/pension-catchup',  title:'국민연금 추납·임의가입 계산기', desc:'추납액 → 늘어나는 연금과 회수 기간' },
      { href:'/calculator/pension-tax',      title:'연금소득세 계산기',       desc:'연금 수령액 → 세금과 세후 실수령액', hot:true },
      { href:'/calculator/ltc-copay',      title:'장기요양 본인부담금 계산기', desc:'재가·시설 부담률 → 한도 초과분·비급여 포함 월 부담', hot:true },
      { href:'/calculator/severance-vs-pension', title:'퇴직금 일시금 vs 연금 비교 계산기', desc:'일시금과 IRP 연금 수령 → 세후 금액·차액 비교', hot:true },
      { href:'/calculator/survivor-pension', title:'유족연금 계산기',        desc:'가입기간별 지급률 · 중복급여 조정 갈림길' },
      { href:'/calculator/pension-split',    title:'국민연금 분할연금 계산기', desc:'이혼 시 혼인기간 몫 → 두 사람 각각의 연금' },
    ],
  },
  {
    id: 'finance', label: '금융', icon: '📈',
    desc: '투자·저축·대출 계산기',
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    calcs: [
      { href:'/calculator/compound',       title:'복리 계산기',           desc:'월복리·분기·연복리 + 연도별 테이블', hot:true },
      { href:'/calculator/loan',           title:'대출 이자 계산기',       desc:'원리금균등·원금균등 + 상환 스케줄' },
      { href:'/calculator/loan-method',     title:'대출 상환방식 비교 계산기', desc:'원리금균등·원금균등·만기일시 총이자' },
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
      { href:'/calculator/dti',            title:'DTI 계산기',             desc:'총부채상환비율 · 한도별 대출 원금' },
      { href:'/calculator/student-loan', title:'학자금 대출 상환 계산기', desc:'취업 후 상환 vs 일반 상환 — 총액·이자·기간 비교', hot:true },
      { href:'/calculator/youth-savings', title:'청년 목돈 마련 계좌 계산기', desc:'정부 기여금 포함 만기 수령액 · 일반 적금과 차액' },
      { href:'/calculator/ltv',            title:'LTV 계산기',             desc:'담보인정비율 계산' },
      { href:'/calculator/exchange',       title:'환율 계산기',            desc:'실시간 API · 주요 통화 변환' },
      { href:'/calculator/loan-prepayment-fee', title:'중도상환수수료 계산기', desc:'조기상환 시 발생하는 수수료 계산' },
      { href:'/calculator/refinance',     title:'대출 갈아타기 계산기',   desc:'대환 이득 여부 + 손익분기점 계산', hot:true },
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
      { href:'/calculator/jeonse-wolse',        title:'전세 월세 유불리 계산기', desc:'내 상황에서 어느 쪽이 이득인지 비교', hot:true },
      { href:'/calculator/deposit-conversion',   title:'환산보증금 계산기', desc:'상가 임대차 — 보증금 + 월세×100' },
      { href:'/calculator/acquisition-tax',     title:'취득세 계산기',      desc:'부동산 취득세 계산' },
      { href:'/calculator/home-buying-cost', title:'집 살 때 부대비용 계산기', desc:'취득세·중개보수·인지세·채권·이사비까지 총 필요자금', hot:true },
      { href:'/calculator/moving-cost', title:'이사 비용 계산기', desc:'평수·이사 종류·층수·사다리차까지 항목별 이사비 — 견적서 비교용', hot:true },
      { href:'/calculator/jeonse-safety', title:'전세 보증금 안전도 계산기', desc:'깡통전세 판정 — 경매로 넘어가면 얼마 떼이나', hot:true },
      { href:'/calculator/property-tax',        title:'재산세 계산기',      desc:'재산세 예상 계산' },
      { href:'/calculator/holding-tax',         title:'보유세 계산기',      desc:'종부세 포함 보유세' },
      { href:'/calculator/rental-yield',        title:'임대수익률 계산기',  desc:'매매가·월세 → 표면·실투자 수익률', hot:true },
      { href:'/calculator/subscription-score',  title:'청약 가점 계산기',   desc:'무주택기간·부양가족 → 가점' },
      { href:'/calculator/lease-renewal',  title:'계약갱신 인상 한도 계산기', desc:'전세·월세 5% 상한과 월 부담' },
    ],
  },
  {
    id: 'life', label: '생활', icon: '🌿',
    desc: '일상생활 편의 계산기',
    accent: 'bg-teal-50 text-teal-700 border-teal-200',
    calcs: [
      { href:'/calculator/bmi',            title:'BMI 계산기',         desc:'키·몸무게 → BMI + 표준체중' },
      { href:'/calculator/caffeine',       title:'카페인 계산기',      desc:'반감기 공식으로 체내 잔존 카페인량 계산' },
      { href:'/calculator/wedding-gift',   title:'축의금 계산기',      desc:'관계·참석 여부별 적정 축의금 가이드' },
      { href:'/calculator/new-year-money', title:'세뱃돈 계산기',        desc:'나이·관계별 금액대와 여러 아이 합계', hot:true },
      { href:'/calculator/condolence-money', title:'부의금(조의금) 계산기', desc:'관계·조문 여부별 3·5·7·10만원 어디쯤', hot:true },
      { href:'/calculator/body-fat',       title:'체지방률 계산기',    desc:'해군 공식 기반 체지방률 계산' },
      { href:'/calculator/bmr',            title:'기초대사량 계산기',  desc:'BMR (Harris-Benedict) 계산' },
      { href:'/calculator/calorie',        title:'칼로리 계산기',      desc:'활동 수준별 권장 칼로리' },
      { href:'/calculator/calories-burn',  title:'운동 칼로리 계산기', desc:'운동 종류·시간·체중 → 소모 칼로리' },
      { href:'/calculator/water',          title:'물 섭취량 계산기',   desc:'체중 기준 권장 수분 섭취량' },
      { href:'/calculator/protein',        title:'단백질 섭취량 계산기', desc:'체중·활동량 → 하루 권장 단백질' },
      { href:'/calculator/ideal-weight',   title:'표준체중 계산기',      desc:'키·성별 → 표준체중과 정상 BMI 체중 범위' },
      { href:'/calculator/child-height',   title:'자녀 예상 키 계산기',  desc:'부모 키 → 중간부모키와 예상 성인 키 범위', hot:true },
      { href:'/calculator/one-rep-max',    title:'1RM 계산기',           desc:'든 무게·횟수 → 1회 최대 중량과 강도별 무게', hot:true },
      { href:'/calculator/running-pace',   title:'러닝 페이스 계산기',   desc:'목표 기록 → km당 페이스·구간 통과 시각', hot:true },
      { href:'/calculator/sober-time',     title:'음주 후 운전 가능 시간 계산기', desc:'혈중알코올농도·분해 시간 추정', hot:true },
      { href:'/calculator/blood-pressure', title:'혈압 체크기',        desc:'수축기·이완기 → WHO 기준 등급' },
      { href:'/calculator/sleep',          title:'수면 계산기',        desc:'기상시간 기준 취침시간 추천' },
      { href:'/calculator/ovulation',      title:'배란일 계산기',      desc:'마지막 생리일 → 배란일·가임기' },
      { href:'/calculator/pregnancy',      title:'임신 예정일 계산기', desc:'마지막 생리일 → 출산 예정일' },
      { href:'/calculator/dday',           title:'D-day 계산기',       desc:'목표일 D-day · 날짜 간격' },
      { href:'/calculator/discharge',   title:'전역일 계산기',     desc:'입대일·군별 → 전역일과 남은 날' },
      { href:'/calculator/military-pay', title:'군인 월급 계산기',  desc:'계급별 봉급 총액 + 장병내일준비적금 목돈', hot:true },
      { href:'/calculator/age',            title:'나이 계산기',        desc:'만나이·한국나이 계산' },
      { href:'/calculator/birthday',       title:'생년월일 계산기',    desc:'요일·출생일 기준 계산' },
      { href:'/calculator/time-diff',      title:'시간 계산기',        desc:'두 시각 차이 · 시간 더하기' },
      { href:'/calculator/percent',        title:'퍼센트 계산기',      desc:'증가율·감소율·비율 계산' },
      { href:'/calculator/discount',       title:'할인 계산기',        desc:'정가·할인율 → 할인가 · 역산' },
      { href:'/calculator/tip',            title:'팁 계산기',          desc:'금액·팁율·인원수 → 1인당 팁' },
      { href:'/calculator/dutch-pay',      title:'더치페이 계산기',    desc:'총액·인원수 → 각자 부담액' },
      { href:'/calculator/gpa',            title:'학점/GPA 계산기',    desc:'과목별 성적 → 평균 학점' },
      { href:'/calculator/school-rank',   title:'내신 등급 계산기',   desc:'석차·수강자수 → 석차등급과 단위수 가중평균', hot:true },
      { href:'/calculator/average',        title:'평균 계산기',        desc:'평균·중앙값·최빈값·표준편차 한 번에' },
      { href:'/calculator/pet-age',        title:'반려동물 나이 계산기', desc:'강아지·고양이 나이 → 사람 나이' },
      { href:'/calculator/shoe-size',      title:'신발 사이즈 변환기', desc:'발 길이 mm → EU·UK·US 치수' },
      { href:'/calculator/rice-water',     title:'밥물 계산기',        desc:'쌀 양 → 백미·현미·잡곡·죽 물 양' },
      { href:'/calculator/coffee-ratio',   title:'커피 비율 계산기',   desc:'추출 방식별 원두·물 비율' },
      { href:'/calculator/data-usage',     title:'데이터 사용량 계산기', desc:'화질별 소모량 → 남은 데이터 가능 시간' },
      { href:'/calculator/volumetric-weight', title:'부피무게 계산기', desc:'택배·항공 운임 무게 계산' },
      { href:'/calculator/charge-time',    title:'충전 시간 계산기',   desc:'mAh·충전기 W → 완충 시간' },
    ],
  },
  {
    id: 'car', label: '자동차', icon: '🚗',
    desc: '자동차 관련 계산기',
    accent: 'bg-orange-50 text-orange-700 border-orange-200',
    calcs: [
      { href:'/calculator/car-insurance-surcharge', title:'자동차 보험 할증 계산기', desc:'사고 유형·무사고 햇수 → 3년 추가 보험료와 자비 비교', hot:true },
      { href:'/calculator/car-installment', title:'자동차 할부 계산기',  desc:'차량가·금리·기간 → 월 할부금' },
      { href:'/calculator/car-cost',        title:'차량 유지비 계산기', desc:'연간 유지비와 1km당 비용' },
      { href:'/calculator/car-depreciation', title:'자동차 감가상각 계산기', desc:'연식별 잔존가치와 반감기' },
      { href:'/calculator/car-registration', title:'자동차 취등록세 계산기', desc:'차값 외 취득세·공채·등록비' },
      { href:'/calculator/car-excise-tax', title:'자동차 개별소비세 계산기', desc:'출고가에 든 개소세·교육세·부가세 역산' },
      { href:'/calculator/traffic-fine', title:'교통 범칙금·과태료 계산기', desc:'속도위반 벌점·면허정지와 어느 쪽으로 낼지', hot:true },
      { href:'/calculator/ev-vs-gas',      title:'전기차 vs 내연차 유지비 비교 계산기', desc:'차값 차이를 유지비로 뽑는 손익분기 연수', hot:true },
      { href:'/calculator/car-lease-vs-loan', title:'자동차 리스·할부·현금 비교 계산기', desc:'세 방식의 총비용을 잔존가치까지 넣어 비교' },
      { href:'/calculator/car-tax',         title:'자동차세 계산기',     desc:'배기량 기준 자동차세' },
      { href:'/calculator/fuel-efficiency', title:'연비 계산기',          desc:'주행거리·연료량 → 연비' },
      { href:'/calculator/gas-cost',        title:'주유비 계산기',        desc:'거리·연비·유가 → 주유비' },
      { href:'/calculator/ev-charge',       title:'전기차 충전비 계산기', desc:'배터리·충전량 → 충전 비용' },
    ],
  },
  {
    id: 'utility', label: '공과금', icon: '💡',
    desc: '전기·가스·수도요금과 절감 회수 계산기',
    accent: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    calcs: [
      { href:'/calculator/electricity', title:'전기요금 계산기', desc:'kWh 기준 누진요금 계산' },
      { href:'/calculator/electricity-reverse', title:'전기요금 역산 계산기', desc:'요금으로 사용량(kWh) 되찾기' },
      { href:'/calculator/gas-bill',    title:'가스요금 계산기', desc:'사용량 기준 도시가스요금' },
      { href:'/calculator/water-bill',  title:'수도요금 계산기', desc:'사용량 기준 수도요금 계산' },
      { href:'/calculator/heating-bill', title:'난방비 계산기', desc:'지역난방 열량(Mcal) 기준 난방요금' },
      { href:'/calculator/appliance-power', title:'가전 전기요금 계산기', desc:'에어컨·건조기 켜면 얼마 더 나오나' },
      { href:'/calculator/maintenance-fee', title:'관리비 계산기', desc:'항목별 비중 + ㎡당 단가 분석' },
      { href:'/calculator/solar-payback',  title:'태양광 발전 수익 계산기', desc:'몇 년에 본전 뽑나 · 누진 절감액 반영', hot:true },
      { href:'/calculator/aircon-capacity', title:'에어컨 용량 계산기', desc:'면적·용도로 필요한 냉방능력과 몇 평형을 살지', hot:true },
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
      { href:'/calculator/unit-volume', title:'부피 단위 변환기', desc:'mL·L·컵·홉·되·말·갤런 변환' },
      { href:'/calculator/speed-time',  title:'속도 거리 시간 계산기', desc:'셋 중 둘 → 나머지 · km/h·m/s·페이스' },
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
/**
 * 같은 분류의 이웃 계산기 — **자기 자리 다음부터 원형으로 감아** 고른다.
 *
 * ── 2026-08-12에 무엇이 있었나 ────────────────────────────
 * 전에는 `related.slice(0, limit)`이었다. 즉 분류의 **앞에서 여섯 개**를 늘
 * 뽑았다. 그래서 항목이 일곱 개를 넘는 분류에서는 **일곱 번째부터 형제에게서
 * 들어오는 링크가 0**이 됐다. 141개 중 73개(52%)가 그 상태였고, 거기에
 * 퇴직금·실업급여·육아휴직 급여처럼 검색량이 큰 페이지가 들어 있었다.
 *
 * 들어오는 링크가 없는 페이지는 크롤러가 사이트맵으로만 닿는다. 사이트맵은
 * "이 주소가 있다"까지만 말해 주고 "이 주소가 중요하다"고는 말해 주지 않는다.
 *
 * 원형으로 감으면 항목이 limit보다 많은 분류에서 **모든 항목이 정확히 limit
 * 개의 이웃 목록에 들어간다** — 앞뒤가 고르게 이어진다. lib/cmd·lib/shortcut·
 * lib/emoji에서 같은 병을 같은 방법으로 고쳤다.
 */
export function getRelatedCalcs(href: string, limit = 6): CalcItem[] {
  const cat = findCategory(href);
  const related: CalcItem[] = [];

  if (cat) {
    const n = cat.calcs.length;
    const at = cat.calcs.findIndex((c) => c.href === href);
    // 자기가 목록에 없으면(분류만 맞고 항목이 없는 경우) 앞에서부터 채운다
    const start = at >= 0 ? at : -1;
    for (let k = 1; k <= n && related.length < limit; k++) {
      const c = cat.calcs[(((start + k) % n) + n) % n];
      if (c.href !== href) related.push(c);
    }
  }
  if (related.length >= limit) return related;

  // 같은 분류가 부족하면 인기(hot) 계산기로 보충
  const hot = CATS.flatMap((c) => c.calcs).filter(
    (c) => c.hot && c.href !== href && !related.some((r) => r.href === c.href)
  );
  return [...related, ...hot].slice(0, limit);
}
