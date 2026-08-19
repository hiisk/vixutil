import type { Metadata } from 'next';
import Link from 'next/link';
import CalcShareBtn from './CalcShareBtn';
import SiteFooter from './SiteFooter';
import RelatedCalcs from './RelatedCalcs';
import CrossLinks from './CrossLinks';
import PageGlow from './PageGlow';
import PageHero from './PageHero';
import CalcFaq from './CalcFaq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from './JsonLd';
import type { FaqItem } from '@/lib/calc-faq';
import ReferralCards from './ReferralCards';
import ReferralAside, { RAIL_WRAP } from './ReferralAside';

// 각 페이지에서 export const metadata 설정을 위한 헬퍼
export function makeMetadata(title: string, description: string): Metadata {
  return { title, description };
}

/**
 * 본문 기둥 — 머리 띠와 본문이 **이 하나를** 나눠 쓴다.
 *
 * 폭이 두 곳에 적히면 한쪽만 고쳤을 때 제목이 본문과 다른 자리에서 시작한다.
 * 실제로 그랬던 적이 있어 tests/referral-placement.test.ts가 붙들고 있다.
 * 렌더 밖에 두는 것은 안에서 만들면 렌더마다 새 컴포넌트가 되기 때문이다.
 */
function Column({ width, children }: { width: string; children: React.ReactNode }) {
  return <div className={`${width} mx-auto w-full min-w-0 xl:mx-0`}>{children}</div>;
}

export default function CalcShell({
  title,
  description,
  path,
  wide,
  faq,
  intro,
  children,
}: {
  title: string;
  description: string;
  /**
   * 이 계산기의 경로(예: '/calculator/salary').
   * 없으면 breadcrumb의 마지막 항목이 자기 URL을 못 가리켜 구조화 데이터가
   * 무효가 되고, WebApplication도 못 낸다. usePathname은 클라이언트 훅이라
   * 서버 컴포넌트인 여기서는 쓸 수 없어 prop으로 받는다.
   */
  path?: string;
  wide?: boolean;
  /** 페이지 하단 자주 묻는 질문 — 표시 + FAQPage 구조화 데이터로 함께 출력 */
  faq?: FaqItem[];
  /** 결과 아래 노출할 설명 문단 (SEO용 본문 콘텐츠) */
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  /*
    ── 본문 폭을 큰 화면에서만 넓혔다 (2026-08-12) ──

    576px(max-w-xl)은 한국어 16px 본문에서 한 줄에 34자쯤이다. 짧다고 못 읽는
    폭은 아니지만, 1440px 화면에서 양옆이 430px씩 비어 있었다. lg부터 한 단계
    넓혀(672px) 읽기 좋은 줄 길이 안에 두고, 상한을 둬서 무한히 늘어나지 않게 한다
    — 줄이 너무 길어지면 다음 줄 머리로 눈이 돌아오기 힘들어진다.

    sm 이하는 한 픽셀도 건드리지 않는다. 접두어 없는 max-w-xl이 그대로 있고 lg:만
    얹혔다 — 모바일이 방문의 대부분이라 여기서 폭이 바뀌면 잃는 쪽이 크다.

    머리글과 본문이 폭을 각각 적지 않고 이 기둥 하나를 함께 쓴다. 예전에는 같은
    삼항식이 두 줄에 적혀 있었고, 한쪽만 고치면 제목이 본문과 다른 자리에서
    시작한다. 이제 어긋날 수가 없다.
  */
  const width = wide ? 'max-w-3xl lg:max-w-4xl' : 'max-w-xl lg:max-w-2xl';

  /*
    본문 기둥. 머리 띠와 본문이 **같은 자리에서 시작해야** 하므로 폭을 여기
    한 번만 적고 두 곳에서 부른다. 예전에는 같은 삼항식이 두 줄에 적혀 있었고
    한쪽만 고치면 제목이 본문과 다른 자리에서 시작했다.
  */

  return (
    /*
      배경에 아주 옅은 컬러 웜을 깔고, 그 위에 반투명 카드를 올린다(글래스모피즘).
      불투명 흰 카드를 회색 판에 얹던 기존 플랫 디자인보다 깊이감이 생긴다.
      다만 투명도는 85% 이상으로 유지한다 — 계산기는 숫자를 읽는 화면이라
      배경이 비쳐 대비가 떨어지면 디자인이고 뭐고 소용없다.
    */
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="blue" />

      <div className="relative">
        <JsonLd
          data={breadcrumbJsonLd([
            { name: '홈', path: '/' },
            { name: '계산기', path: '/calculator' },
            { name: title, path: path ?? '/calculator' },
          ])}
        />
        {/* 계산기는 무료 웹 도구다 — WebApplication으로 알리면 검색에서 도구로 인식된다 */}
        {path && <JsonLd data={webAppJsonLd(title, description, path)} />}
        {/* 상단 바 */}
        <div className="h-1 topbar" />

        {/* 네비 헤더 */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
            <Link
              href="/calculator"
              className="page-back hover:text-blue-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              전체 계산기
            </Link>
            <span className="text-slate-200">·</span>
            {/* 제목은 바로 아래 머리에 크게 있다 — 여기서 또 적으면 같은 말이 두 번이다 */}
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex-1 truncate">{title}</span>
            <CalcShareBtn />
          </div>
        </header>

        {/*
          ── 본문 기둥 + 옆 제휴 레일 (2026-08-12) ──

          레일은 넓힌 본문의 **바깥**, 남는 여백에 들어간다. 본문을 좁혀 자리를
          만드는 것이 아니다 — 그래서 레일이 생겨도 한 줄의 글자 수는 그대로다.

          잃는 것 — 레일이 뜨는 xl 이상에서 본문 기둥이 페이지 가운데가 아니라
          왼쪽으로 160px쯤 붙는다("기둥 + 레일" 묶음이 가운데다). 레일이 없는
          화면은 예전처럼 가운데다.
        */}
        <div className={wide ? RAIL_WRAP.wide : RAIL_WRAP.narrow}>
          <Column width={width}>
            {/* 본문 — 머리 띠는 이 기둥 밖에서 화면을 가로지른다(아래 Column 참고) */}
            {/* 머리 — 기둥 안에 있고 실선만 화면 폭으로 나간다(globals.css .hero-band) */}
            <div className="hero-band px-4">
              <PageHero className="hero-flat" title={title} desc={description} icon="🧮" />
            </div>

            <main className="tool-body tool-lift px-4 pb-8">
              {children}

              {/*
                ── 결과 바로 아래로 옮겼다 (2026-08-15) ──

                예전에는 설명 문단 **뒤**였다. 계산기와 그 해설 사이를 광고로 끊지
                않으려던 것인데, 실제 화면(scratchpad/ui/3-calc-salary.png)을 재 보니
                결과와 카드 사이에 문단이 셋(240px 이상, 모바일은 그 배)이 끼어 있었다.
                답을 얻은 직후가 시선이 가장 오래 머무는 자리인데 거기를 비워 두고
                스크롤 한참 아래에 광고를 둔 셈이다. 흐름을 지킨 값이 노출이었다.

                {children}가 곧 "폼 + 결과"다 — 결과는 계산기 안에서 그려지므로
                children 바로 뒤가 결과 바로 아래다.

                ── 결과 전(첫 진입)에도 그대로 보인다 ──
                이 껍데기는 서버 컴포넌트이고 children이 무엇을 그렸는지 모른다.
                결과가 있는지 알려면 계산기 300여 장이 저마다 신호를 넘겨야 하는데,
                결과를 버튼 뒤에 감추는 것은 한국어 148장 중 47장뿐이고 나머지는
                입력하는 대로 갱신돼 "결과 전"이라는 상태 자체가 없다. 옛 배치에서도
                카드는 첫 진입에 이미 보이고 있었으므로 감추는 쪽이 오히려 새 동작이다.
                자리만 옮기고 조건은 더하지 않는다.

                rail은 "이 화면에 옆 레일이 함께 뜬다"는 뜻이다. 그래야 xl 이상에서
                본문 카드와 레일이 같은 거래소를 두 번 보여 주지 않는다.
                section='calc' — sub-id에 섹션을 실어 계산기발 클릭을 갈라 본다 (ko-calc-result)
              */}
              <ReferralCards placement="result" rail section="calc" />

              {intro && (
                <div className="mt-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-800 dark:[&_h2]:text-slate-100 [&_strong]:text-slate-800 dark:[&_strong]:text-slate-100">
                  {intro}
                </div>
              )}

              {/* 다른 섹션에 이어지는 다음 행동이 있으면 먼저 보여준다 (예: 실업급여 계산 → 신청 체크리스트) */}
              <CrossLinks />

              <RelatedCalcs />

              <CalcFaq items={faq} />

              {/*
                ── 틀릴 수 있다는 것을 모든 계산기에 적는다 (2026-08-12) ──

                계산기 146개에는 해마다 고시로 바뀌는 값(세율 구간·보험 요율·최저임금·
                요금표·연금 상수)이 들어 있다. 시행 직후에는 반영에 시차가 생기고,
                개인 사정에 따른 예외를 다 담을 수도 없다.

                그런데 그 사실이 지금까지 **허브 FAQ 한 줄에만** 있었다. 개별 계산기는
                페이지마다 각주가 있는 것도 있고 없는 것도 있었다. 계산 결과가 큰
                숫자로 크게 떠 있으면 사람들은 그것을 확정된 금액으로 읽는다 — 그래서
                껍데기에 넣어 146장 전부에 같은 문구가 뜨게 했다.

                이 자리를 FAQ 뒤에 둔 것은 결과 바로 아래에 두면 계산 흐름을 끊기
                때문이다. 대신 글씨를 죽이지 않고 테두리를 줘서 눈에 들어오게 했다.
              */}
              <div className="mt-8 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 p-5">
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
                  이 결과는 틀릴 수 있습니다
                </p>
                <p className="text-xs leading-relaxed text-amber-800/90 dark:text-amber-300/80">
                  공개된 산식과 표준 요율로 낸 <strong>참고용 추정치</strong>입니다. 세율 구간·보험 요율·
                  최저임금·요금표처럼 <strong>해마다 고시로 바뀌는 값</strong>은 시행 직후 반영에 시차가 생길
                  수 있고, 개인 사정에 따른 예외와 감면을 모두 담지도 못합니다. 금액이 중요한 판단에
                  쓰인다면 관계 기관의 최신 고시나 금융사·공단의 확정 통보로 반드시 확인하세요.
                </p>
              </div>
            </main>
          </Column>

          <ReferralAside section="calc" />
        </div>

        <SiteFooter referral={false} />
      </div>
    </div>
  );
}

/* ── 공통 UI 컴포넌트 ── */

/**
 * 본문 판 — 단색이다. 예전에는 반투명 유리(backdrop-blur)였는데 두 가지가 걸렸다.
 * 하나, 홈이 단색 판으로 바뀌면서 계열이 갈렸다. 둘, blur는 스크롤하는 동안
 * 모바일 GPU를 계속 태운다 — 계산기는 표를 길게 내리는 화면이다.
 * 생김새는 globals.css의 .surface에 있다.
 */
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`surface ${className}`}>{children}</div>;
}

export function CardHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <p className="font-bold text-slate-800 dark:stat-sub">{title}</p>
      {sub && <span className="text-xs text-slate-400 dark:text-slate-500">{sub}</span>}
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="fld-lbl">{children}</label>;
}

/*
 * 입력칸은 이미 사이트 공용 .fld가 있다(globals.css). 여기 300자짜리 문자열이
 * 따로 있어서 계산기만 다른 칸을 쓰고 있었고, 초점 테두리도 파랑으로 박혀 있어
 * 갈래 색을 안 따라갔다. .fld는 --c-sec를 쓴다.
 *
 * class 속성은 낱장 HTML의 17~26%다. 문자열을 클래스 이름으로 바꾸면 한 장에
 * 칸 수만큼 300자가 준다.
 */
export const inputCls = 'fld w-full';

export const selectCls = 'fld fld-sel w-full';

export function PrimaryBtn({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group btn-pri"
    >
      {children}
      <svg className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </button>
  );
}

export function TabBar<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; sub?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="surface flex rounded-xl overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={value === opt.value ? 'tab-on' : 'tab-off'}
        >
          {opt.label}
          {opt.sub && <span className="block text-xs font-normal opacity-70">{opt.sub}</span>}
        </button>
      ))}
    </div>
  );
}

export function SummaryGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{children}</div>;
}

export function SummaryCard({
  label, value, sub, variant = 'default',
}: {
  label: string; value: string; sub?: string;
  variant?: 'default' | 'primary' | 'green' | 'red';
}) {
  /*
    생김새는 globals.css의 .stat 계열에 있다 — 왜 주인공 칸을 꽉 채우지 않는지도
    거기 적었다. green·red는 뜻이 있는 색이라(늘었다·줄었다) 갈래 색으로 바꾸지
    않는다. 계산기 101장이 이 한 부품을 함께 쓴다.
  */
  const cls = { default: 'stat', primary: 'stat-pri', green: 'stat-up', red: 'stat-down' }[variant];
  return (
    <div className={cls}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
  );
}

export function RatioBar({ a, b, labelA, labelB }: { a: number; b: number; labelA: string; labelB: string }) {
  const total = a + b;
  const pctA = total > 0 ? (a / total) * 100 : 50;
  return (
    <div>
      <div className="flex h-6 rounded-lg overflow-hidden text-xs font-bold">
        <div className="bar-a flex items-center justify-center text-white transition-all" style={{ width: `${pctA}%` }}>
          {pctA > 20 && `${pctA.toFixed(0)}%`}
        </div>
        <div className="bg-rose-400 flex items-center justify-center text-white flex-1">
          {(100 - pctA) > 20 && `${(100 - pctA).toFixed(0)}%`}
        </div>
      </div>
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5">
        <span className="flex items-center gap-1"><span className="bar-a w-2 h-2 rounded-full inline-block" />{labelA}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />{labelB}</span>
      </div>
    </div>
  );
}

export function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-0">
      {children}
    </div>
  );
}

export function ShowMoreBtn({ total, showing, onClick }: { total: number; showing: number; onClick: () => void }) {
  if (total <= showing) return null;
  return (
    <button
      onClick={onClick}
      className="btn-more"
    >
      전체 {total}개 보기 (현재 {showing}개 표시)
    </button>
  );
}
