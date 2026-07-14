'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getRelatedCalcs, findCategory } from '@/lib/calculator-catalog';

/**
 * 현재 계산기와 같은 카테고리의 다른 계산기를 추천한다.
 * usePathname으로 현재 경로를 자동 감지하므로 페이지별 설정이 필요 없다.
 */
export default function RelatedCalcs() {
  const pathname = usePathname();
  if (!pathname) return null;

  const related = getRelatedCalcs(pathname, 6);
  if (related.length === 0) return null;

  const cat = findCategory(pathname);

  return (
    <section className="mt-8" aria-label="관련 계산기">
      <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">
        {cat ? `${cat.icon} ${cat.label} 계산기 더보기` : '함께 쓰면 좋은 계산기'}
      </h2>
      <div className="grid sm:grid-cols-2 gap-2">
        {related.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 truncate">
                {c.title}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{c.desc}</p>
            </div>
            <svg className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
