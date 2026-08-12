import type { Metadata } from 'next';
import Link from 'next/link';
import CalcShareBtn from './CalcShareBtn';
import SiteFooter from './SiteFooter';
import RelatedCalcs from './RelatedCalcs';
import CrossLinks from './CrossLinks';
import PageGlow from './PageGlow';
import CalcFaq from './CalcFaq';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from './JsonLd';
import type { FaqItem } from '@/lib/calc-faq';
import ReferralCards from './ReferralCards';
import ReferralAside, { RAIL_WRAP } from './ReferralAside';

// 각 페이지에서 export const metadata 설정을 위한 헬퍼
export function makeMetadata(title: string, description: string): Metadata {
  return { title, description };
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
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-400" />

        {/* 네비 헤더 */}
        <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/60 dark:border-slate-700/60 sticky top-0 z-10">
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
          <div className={`${width} mx-auto w-full min-w-0 xl:mx-0`}>
            {/* 페이지 타이틀 */}
            <div className="px-4 pt-8 pb-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{title}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">{description}</p>
            </div>

            {/* 본문 */}
            <main className="px-4 py-6 pb-8">
              {children}

              {intro && (
                <div className="mt-8 text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-slate-800 dark:[&_h2]:text-slate-100 [&_strong]:text-slate-800 dark:[&_strong]:text-slate-100">
                  {intro}
                </div>
              )}

              {/*
                계산기는 입력하는 대로 결과가 갱신돼서 "제출 버튼"이라는 순간이 없다.
                그래서 결과 바로 아래가 아니라 설명 문단 뒤에 둔다 — 계산기와 그 해설
                사이를 광고로 끊으면, 저품질 판정 대응으로 본문을 정적 렌더링해 넣은
                작업(cf966da)이 노리던 "도구 + 설명" 흐름이 깨진다.

                ── 그래서 자리를 안 옮겼다 (2026-08-12) ──
                결과 바로 아래가 클릭이 가장 잘 되는 자리인 것은 맞다. 설명 문단
                **앞**으로 올리는 것도 재 봤는데, 그게 바로 위 문단이 거부한 그
                자리다 — 계산기와 해설 사이가 정확히 거기다. 그래서 흐름을 사는 대신
                노출을 옆으로 늘렸다: 넓은 화면에서는 ReferralAside가 결과 옆
                눈높이에 서고, 좁은 화면에서는 여기 이 카드가 예전 자리를 지킨다.
                대신 카드 자체를 키웠다(제목 한 단계·금액 32→36px·테두리 2px).

                rail은 "이 화면에 옆 레일이 함께 뜬다"는 뜻이다. 그래야 xl 이상에서
                본문 카드와 레일이 같은 거래소를 두 번 보여 주지 않는다.
              */}
              <ReferralCards placement="result" rail />

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
          </div>

          <ReferralAside />
        </div>

        <SiteFooter referral={false} />
      </div>
    </div>
  );
}

/* ── 공통 UI 컴포넌트 ── */

/**
 * 반투명 유리 카드. 흰 배경을 85%로 두어 뒤의 컬러 글로우가 은은하게 비치되,
 * 본문 대비는 그대로 유지한다. 그림자는 회색이 아니라 파란빛을 섞어
 * 배경 톤과 어우러지게 했다.
 */
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/70 dark:border-slate-700/70 rounded-2xl shadow-[0_8px_24px_-12px_rgba(59,130,246,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
      <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{title}</p>
      {sub && <span className="text-xs text-slate-400 dark:text-slate-500">{sub}</span>}
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
      {children}
    </label>
  );
}

// 입력 필드는 카드보다 조금 더 불투명하게 — 값을 읽고 쓰는 곳이라 대비가 최우선이다.
// 호버 시 테두리를 살짝 진하게 해 "여기 입력할 수 있다"는 느낌을 준다.
export const inputCls =
  "w-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-300 transition-all";

export const selectCls =
  "w-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-300 transition-all";

export function PrimaryBtn({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white rounded-xl py-3.5 font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
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
    <div className="flex bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/70 dark:border-slate-700/70 rounded-xl overflow-hidden shadow-[0_8px_24px_-12px_rgba(59,130,246,0.18)]">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-3 text-sm font-semibold transition-all leading-tight ${
            value === opt.value
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
              : 'text-slate-500 dark:text-slate-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40'
          }`}
        >
          {opt.label}
          {opt.sub && <span className={`block text-xs font-normal ${value === opt.value ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>{opt.sub}</span>}
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
  // primary는 결과에서 제일 중요한 숫자다 — 그라데이션과 컬러 그림자로 확실히 띄운다.
  const styles = {
    default: 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-white/70 dark:border-slate-700/70 text-slate-800 dark:text-slate-100 shadow-[0_8px_24px_-12px_rgba(59,130,246,0.18)]',
    primary: 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-500/50 text-white shadow-lg shadow-blue-500/25',
    green:   'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-emerald-200 dark:border-emerald-900/50/70 text-emerald-600 shadow-[0_8px_24px_-12px_rgba(16,185,129,0.22)]',
    red:     'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-red-200 dark:border-red-900/50/70 text-red-500 shadow-[0_8px_24px_-12px_rgba(239,68,68,0.22)]',
  };
  const labelStyles = {
    default: 'text-slate-400 dark:text-slate-500',
    primary: 'text-blue-100',
    green: 'text-slate-400 dark:text-slate-500',
    red: 'text-slate-400 dark:text-slate-500',
  };
  return (
    <div className={`rounded-2xl border p-4 transition-transform duration-200 hover:-translate-y-0.5 ${styles[variant]}`}>
      <p className={`text-xs mb-1 ${labelStyles[variant]}`}>{label}</p>
      <p className="font-black text-base leading-tight">{value}</p>
      {sub && <p className={`text-xs mt-0.5 ${labelStyles[variant]}`}>{sub}</p>}
    </div>
  );
}

export function RatioBar({ a, b, labelA, labelB }: { a: number; b: number; labelA: string; labelB: string }) {
  const total = a + b;
  const pctA = total > 0 ? (a / total) * 100 : 50;
  return (
    <div>
      <div className="flex h-6 rounded-lg overflow-hidden text-xs font-bold">
        <div className="bg-blue-600 flex items-center justify-center text-white transition-all" style={{ width: `${pctA}%` }}>
          {pctA > 20 && `${pctA.toFixed(0)}%`}
        </div>
        <div className="bg-rose-400 flex items-center justify-center text-white flex-1">
          {(100 - pctA) > 20 && `${(100 - pctA).toFixed(0)}%`}
        </div>
      </div>
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />{labelA}</span>
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
      className="w-full mt-3 py-2.5 text-sm text-blue-600 font-semibold border border-blue-200 dark:border-blue-900/50 rounded-xl bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
    >
      전체 {total}개 보기 (현재 {showing}개 표시)
    </button>
  );
}
