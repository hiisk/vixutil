import Link from 'next/link';

/* ── 전체 계산기 데이터 ── */
const CATS = [
  {
    id: 'worker', label: '직장인', icon: '👔',
    desc: '급여·수당·보험 관련 계산기',
    accent: 'bg-blue-50 text-blue-700 border-blue-200',
    calcs: [
      { href:'/salary',         title:'실수령액 계산기',     desc:'연봉 → 공제 후 월 실수령액', hot:true },
      { href:'/weekly-holiday', title:'주휴수당 계산기',     desc:'시급·주 근무시간 → 주휴수당·월급' },
      { href:'/annual-leave-pay',title:'연차수당 계산기',   desc:'월급·미사용 연차 → 연차수당' },
      { href:'/four-insurance', title:'4대보험 계산기',      desc:'월급 → 4대보험 상세 내역' },
      { href:'/minimum-wage',   title:'최저시급 월급 계산기',desc:'2026년 최저시급 기준 월급' },
      { href:'/parttime',       title:'알바 급여 계산기',    desc:'시급·근무일수 → 주급·월급' },
      { href:'/overtime',       title:'야근수당 계산기',     desc:'통상시급·야근시간 → 연장수당' },
      { href:'/to-hourly',      title:'시급 계산기',         desc:'월급 → 시급 환산' },
      { href:'/to-annual',      title:'연봉 계산기',         desc:'월급 → 연봉 환산' },
      { href:'/standard-wage',  title:'통상임금 계산기',     desc:'기본급·고정수당 → 통상임금' },
      { href:'/severance',      title:'퇴직금 계산기',       desc:'평균임금+상여+연차 → 법령기준 퇴직금' },
    ],
  },
  {
    id: 'tax', label: '세금', icon: '🧾',
    desc: '각종 세금 계산기',
    accent: 'bg-amber-50 text-amber-700 border-amber-200',
    calcs: [
      { href:'/freelance',        title:'프리랜서 세금 계산기', desc:'수입 → 3.3% 원천징수', hot:true },
      { href:'/vat',              title:'부가세 계산기',         desc:'공급가액 ↔ 부가가치세 계산' },
      { href:'/business-income',  title:'사업소득세 계산기',     desc:'사업소득 → 예상 세금' },
      { href:'/comprehensive-tax',title:'종합소득세 계산기',     desc:'연소득 → 예상 종합소득세' },
      { href:'/capital-gains',    title:'양도소득세 계산기',     desc:'취득가·양도가 → 예상 세금' },
      { href:'/gift-tax',         title:'증여세 계산기',         desc:'증여금액·관계 → 예상 증여세' },
      { href:'/inheritance-tax',  title:'상속세 계산기',         desc:'상속재산 → 예상 상속세' },
      { href:'/local-income-tax', title:'지방소득세 계산기',     desc:'소득세 → 지방소득세 계산' },
    ],
  },
  {
    id: 'finance', label: '금융', icon: '📈',
    desc: '투자·저축·대출 계산기',
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    calcs: [
      { href:'/compound',       title:'복리 계산기',          desc:'월복리·분기·연복리 + 연도별 테이블', hot:true },
      { href:'/loan',           title:'대출 이자 계산기',      desc:'원리금균등·원금균등 + 상환 스케줄' },
      { href:'/deposit',        title:'예금 이자 계산기',      desc:'예치금·금리·기간 → 이자' },
      { href:'/savings',        title:'적금 계산기',           desc:'월 납입금·금리 → 만기금액' },
      { href:'/roi',            title:'투자 수익률 계산기',    desc:'매수·매도 금액 → 수익률' },
      { href:'/avg-price',      title:'평균단가 계산기',       desc:'여러 번 매수 → 평균 단가' },
      { href:'/breakeven',      title:'손익분기점 계산기',     desc:'수수료 포함 손익분기점' },
      { href:'/compound-goal',  title:'복리 목표 계산기',      desc:'목표 금액까지 필요한 기간' },
      { href:'/dividend',       title:'배당금 계산기',         desc:'배당수익률 → 예상 배당금' },
      { href:'/max-loan',       title:'대출 가능 금액 계산기', desc:'소득 기준 최대 대출 금액' },
      { href:'/dsr',            title:'DSR 계산기',            desc:'대출 상환 능력 비율 계산' },
      { href:'/ltv',            title:'LTV 계산기',            desc:'담보인정비율 계산' },
      { href:'/exchange',       title:'환율 계산기',           desc:'실시간 API · 주요 통화 변환' },
    ],
  },
  {
    id: 'realestate', label: '부동산', icon: '🏠',
    desc: '부동산 거래·세금 계산기',
    accent: 'bg-violet-50 text-violet-700 border-violet-200',
    calcs: [
      { href:'/pyeong',             title:'평수 계산기',         desc:'평 ↔ 제곱미터 변환' },
      { href:'/broker-fee',         title:'중개수수료 계산기',   desc:'거래금액 → 중개보수' },
      { href:'/jeonwolse',          title:'전월세 전환 계산기',  desc:'전세 ↔ 월세 환산' },
      { href:'/acquisition-tax',    title:'취득세 계산기',       desc:'부동산 취득세 계산' },
      { href:'/property-tax',       title:'재산세 계산기',       desc:'재산세 예상 계산' },
      { href:'/holding-tax',        title:'보유세 계산기',       desc:'종부세 포함 보유세' },
      { href:'/subscription-score', title:'청약 가점 계산기',    desc:'무주택기간·부양가족 → 가점' },
    ],
  },
  {
    id: 'life', label: '생활', icon: '🌿',
    desc: '일상생활 편의 계산기',
    accent: 'bg-teal-50 text-teal-700 border-teal-200',
    calcs: [
      { href:'/bmi',      title:'BMI 계산기',       desc:'키·몸무게 → BMI + 표준체중' },
      { href:'/dday',     title:'D-day 계산기',     desc:'목표일 D-day · 날짜 간격' },
      { href:'/percent',  title:'퍼센트 계산기',    desc:'증가율·감소율·비율 계산' },
      { href:'/age',      title:'나이 계산기',       desc:'만나이·한국나이 계산' },
      { href:'/birthday', title:'생년월일 계산기',  desc:'요일·출생일 기준 계산' },
      { href:'/calorie',  title:'칼로리 계산기',    desc:'활동 수준별 권장 칼로리' },
      { href:'/bmr',      title:'기초대사량 계산기', desc:'BMR (Harris-Benedict) 계산' },
      { href:'/water',    title:'물 섭취량 계산기',  desc:'체중 기준 권장 수분 섭취량' },
      { href:'/sleep',    title:'수면 계산기',       desc:'기상시간 기준 취침시간 추천' },
      { href:'/ovulation',title:'배란일 계산기',    desc:'마지막 생리일 → 배란일·가임기' },
    ],
  },
  {
    id: 'car', label: '자동차', icon: '🚗',
    desc: '자동차 관련 계산기',
    accent: 'bg-orange-50 text-orange-700 border-orange-200',
    calcs: [
      { href:'/car-installment', title:'자동차 할부 계산기', desc:'차량가·금리·기간 → 월 할부금' },
      { href:'/car-tax',         title:'자동차세 계산기',   desc:'배기량 기준 자동차세' },
      { href:'/fuel-efficiency', title:'연비 계산기',        desc:'주행거리·연료량 → 연비' },
      { href:'/gas-cost',        title:'주유비 계산기',      desc:'거리·연비·유가 → 주유비' },
      { href:'/ev-charge',       title:'전기차 충전비 계산기',desc:'배터리·충전량 → 충전 비용' },
    ],
  },
  {
    id: 'utility', label: '공과금', icon: '💡',
    desc: '전기·가스·수도요금 계산기',
    accent: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    calcs: [
      { href:'/electricity', title:'전기요금 계산기', desc:'kWh 기준 누진요금 계산' },
      { href:'/gas-bill',    title:'가스요금 계산기', desc:'사용량 기준 도시가스요금' },
      { href:'/water-bill',  title:'수도요금 계산기', desc:'사용량 기준 수도요금 계산' },
    ],
  },
  {
    id: 'dev', label: '개발자', icon: '💻',
    desc: '개발자를 위한 도구 모음',
    accent: 'bg-slate-100 text-slate-700 border-slate-300',
    calcs: [
      { href:'/dev/json',      title:'JSON Formatter',          desc:'JSON 정렬·검증·복사' },
      { href:'/dev/base64',    title:'Base64 변환기',           desc:'Base64 인코딩·디코딩' },
      { href:'/dev/url-encode',title:'URL 인코딩 변환기',      desc:'URL 인코딩·디코딩' },
      { href:'/dev/timestamp', title:'Unix Timestamp 변환기',  desc:'날짜 ↔ Timestamp 변환' },
      { href:'/dev/jwt',       title:'JWT Decoder',             desc:'JWT Payload 파싱·확인' },
      { href:'/dev/hash',      title:'MD5 / SHA256 생성기',    desc:'해시 생성 도구' },
      { href:'/dev/regex',     title:'Regex Tester',            desc:'정규식 실시간 테스트' },
      { href:'/dev/uuid',      title:'UUID Generator',          desc:'v4 UUID 생성' },
      { href:'/dev/color',     title:'Color Converter',         desc:'HEX ↔ RGB ↔ HSL 변환' },
      { href:'/dev/cron',      title:'Cron 표현식 생성기',     desc:'Cron Expression 작성·검증' },
      { href:'/dev/sql',       title:'SQL Formatter',           desc:'SQL 정렬·들여쓰기' },
      { href:'/dev/salary',    title:'개발자 연봉 계산기',      desc:'연봉 ↔ 월급 ↔ 시급 변환' },
    ],
  },
];

export default function Home() {
  const total = CATS.reduce((s, c) => s + c.calcs.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-1 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400" />

      {/* 헤더 */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-14 flex items-center gap-4">
            <span className="font-black text-blue-600 text-lg shrink-0">calc.</span>
            {/* 카테고리 탭 — 가로 스크롤 */}
            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 min-w-0">
              {CATS.map(c => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="shrink-0 text-xs font-semibold text-slate-500 hover:text-blue-600 px-2.5 py-1 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap"
                >
                  {c.icon} {c.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4">
        {/* 히어로 */}
        <section className="py-10 sm:py-14 border-b border-slate-100">
          <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-3">Korean Calculator</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-3">
            실생활 계산기 모음
          </h1>
          <p className="text-slate-500 text-sm">
            직장인·세금·금융·부동산·생활·자동차·공과금·개발자 — <strong className="text-slate-700">{total}개</strong> 계산기
          </p>
        </section>

        {/* 카테고리별 섹션 */}
        <div className="py-8 flex flex-col gap-14">
          {CATS.map(cat => (
            <section key={cat.id} id={cat.id}>
              {/* 섹션 헤더 */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h2 className="font-black text-slate-900 text-lg leading-tight">{cat.label} 계산기</h2>
                  <p className="text-xs text-slate-400">{cat.desc}</p>
                </div>
                <span className={`ml-auto shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${cat.accent}`}>
                  {cat.calcs.length}개
                </span>
              </div>

              {/* 계산기 카드 그리드 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {cat.calcs.map(c => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-sm text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                        {c.title}
                      </h3>
                      {(c as {hot?:boolean}).hot && (
                        <span className="shrink-0 ml-1 text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">HOT</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-slate-100 py-8 text-center">
          <p className="text-xs text-slate-300">2026년 기준 · 참고용 계산기입니다</p>
        </footer>
      </div>
    </div>
  );
}
