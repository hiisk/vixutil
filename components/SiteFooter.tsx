import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { REFERRALS, REFERRAL_REL } from "@/lib/referral";

/**
 * 사이트 전역 푸터 — 섹션 간 이동 동선 + 내부링크(SEO) + 인기 도구 노출.
 * 각 도구 페이지가 하나의 섬처럼 고립되지 않도록 모든 하위 페이지에 넣는다.
 */

const SECTIONS: { href: string; icon: string; label: string }[] = [
  { href: "/calculator", icon: "📊", label: "계산기" },
  { href: "/test", icon: "🧭", label: "심리테스트" },
  { href: "/quiz", icon: "🏆", label: "지식퀴즈" },
  { href: "/generator", icon: "⚙️", label: "생성기" },
  { href: "/checklist", icon: "✅", label: "체크리스트" },
  { href: "/fortune", icon: "🔮", label: "오늘의 운세" },
  { href: "/snap", icon: "📸", label: "스냅테스트" },
];

const POPULAR: { href: string; label: string }[] = [
  { href: "/calculator/salary", label: "실수령액" },
  { href: "/calculator/unemployment", label: "실업급여" },
  { href: "/calculator/severance", label: "퇴직금" },
  { href: "/calculator/loan", label: "대출이자" },
  { href: "/calculator/compound", label: "복리" },
  { href: "/fortune/saju", label: "사주분석" },
  { href: "/fortune/dream", label: "꿈해몽" },
  { href: "/fortune/tarot", label: "타로" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 mt-4">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/*
          통합 검색 — 홈에만 있으면 도구 페이지에 깊이 들어온 사용자가 닿을 수 없다.
          푸터는 모든 페이지에 있으므로 여기가 가장 확실한 진입점이다.
        */}
        <Link
          href="/search"
          className="group flex items-center gap-2.5 mb-8 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 transition-colors"
        >
          <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <span className="text-sm text-slate-400 dark:text-slate-500 group-hover:text-slate-600 transition-colors">
            찾는 도구가 있나요?
          </span>
          <span className="ml-auto text-xs font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors">
            전체 검색
          </span>
        </Link>

        {/* 섹션 바로가기 */}
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
          다른 도구 둘러보기
        </p>
        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
            >
              <span className="text-base">{s.icon}</span>
              {s.label}
            </Link>
          ))}
        </nav>

        {/* 인기 도구 */}
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">
          인기 도구
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {POPULAR.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </div>

        {/*
          제휴 링크. 의도적으로 작게 간다 — 이 사이트 방문자는 대부분 계산기나
          체크리스트를 보러 온 사람이라 코인 거래소와 맥락이 멀다. 큰 배너를
          전 페이지에 얹으면 광고 대 콘텐츠 비율이 나빠지고 이탈만 늘린다.

          "광고" 표기를 숨기지 않는다. 숨기면 당장은 클릭이 늘지 몰라도
          신뢰를 잃는다 — 이 사이트가 파는 게 그거다.
        */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-100 dark:border-slate-800 pt-5 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 dark:text-slate-600 shrink-0">
            광고
          </span>
          {REFERRALS.map(r => (
            <a
              key={r.id}
              href={r.href}
              target="_blank"
              rel={REFERRAL_REL}
              className="group inline-flex items-center gap-1.5 rounded-full border border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-950/20 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300 hover:border-amber-400 hover:bg-amber-50 transition-colors"
            >
              {r.name} 가입 혜택
              <span className="font-black">{r.perk}</span>
              <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-5">
          <Link href="/" className="flex items-center gap-0.5 shrink-0">
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tighter">vix</span>
            <span className="text-sm font-black text-blue-600 tracking-tighter">util</span>
          </Link>
          <p className="text-xs text-slate-300 dark:text-slate-600 hidden sm:block">일상에 필요한 실용 도구 · 2026</p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
