import Link from "next/link";

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
    <footer className="border-t border-slate-100 bg-white mt-4">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* 섹션 바로가기 */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
          다른 도구 둘러보기
        </p>
        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <span className="text-base">{s.icon}</span>
              {s.label}
            </Link>
          ))}
        </nav>

        {/* 인기 도구 */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
          인기 도구
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {POPULAR.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="text-sm font-black text-slate-800 tracking-tighter">vix</span>
            <span className="text-sm font-black text-blue-600 tracking-tighter">util</span>
          </Link>
          <p className="text-xs text-slate-300">일상에 필요한 실용 도구 · 2026</p>
        </div>
      </div>
    </footer>
  );
}
