'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CROSS_LINKS } from '@/lib/cross-links';

/**
 * 섹션을 가로지르는 관련 콘텐츠.
 *
 * RelatedCalcs/RelatedContent는 같은 섹션 안에서만 추천하므로, 실업급여 계산기를
 * 보는 사람이 실업급여 신청 체크리스트로 갈 방법이 없었다. 지금 필요한 다음
 * 행동이 다른 섹션에 있는 경우를 이어준다.
 *
 * 경로로 자동 조회하므로 lib/cross-links.ts에 항목만 추가하면 노출된다.
 */
export default function CrossLinks({ className = 'mt-8' }: { className?: string }) {
  const pathname = usePathname();
  const key = pathname?.replace(/^\//, '').replace(/\/$/, '') ?? '';
  const links = CROSS_LINKS[key];
  if (!links?.length) return null;

  return (
    <section className={className} aria-label="함께 보면 좋은 콘텐츠">
      <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">함께 보면 좋아요</h2>
      <div className="flex flex-col gap-2">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className="group flex items-start gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 transition-all hover:border-indigo-200 hover:shadow-sm"
          >
            <span className="shrink-0 w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-lg">
              {l.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-700 transition-colors">
                {l.title}
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">{l.why}</span>
            </span>
            <svg className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 mt-2.5 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  );
}
