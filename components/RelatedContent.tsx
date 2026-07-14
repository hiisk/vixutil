import Link from 'next/link';
import { pickRelated, type RelatedItem } from '@/lib/related';

type Accent = 'violet' | 'amber' | 'sky' | 'emerald';

const ACCENT: Record<Accent, { hoverBorder: string; iconBg: string; hoverText: string }> = {
  violet:  { hoverBorder: 'hover:border-violet-200',  iconBg: 'bg-violet-50',  hoverText: 'group-hover:text-violet-700' },
  amber:   { hoverBorder: 'hover:border-amber-200',   iconBg: 'bg-amber-50',   hoverText: 'group-hover:text-amber-700' },
  sky:     { hoverBorder: 'hover:border-sky-200',     iconBg: 'bg-sky-50',     hoverText: 'group-hover:text-sky-700' },
  emerald: { hoverBorder: 'hover:border-emerald-200', iconBg: 'bg-emerald-50', hoverText: 'group-hover:text-emerald-700' },
};

/**
 * 같은 카테고리의 다른 콘텐츠를 추천한다. 선택 규칙은 lib/related.ts 참고.
 *
 * 상세 페이지가 허브로 되돌아가는 링크밖에 없어 사실상 막다른 길이었다.
 * 서버 컴포넌트라 링크가 정적 HTML에 그대로 들어가고, 덕분에 크롤러가 허브를
 * 거치지 않고도 개별 페이지 사이를 오갈 수 있다.
 */
export default function RelatedContent({
  items,
  currentSlug,
  basePath,
  accent,
  limit = 6,
  bg = 'bg-white dark:bg-slate-900',
}: {
  items: readonly RelatedItem[];
  currentSlug: string;
  basePath: string;
  accent: Accent;
  limit?: number;
  /** 엔진의 배경과 맞춰 경계가 드러나지 않게 한다. */
  bg?: string;
}) {
  const current = items.find(i => i.slug === currentSlug);
  const picked = pickRelated(items, currentSlug, limit);
  if (!current || picked.length === 0) return null;

  const c = ACCENT[accent];

  return (
    <div className={bg}>
      <section className="max-w-lg mx-auto px-4 pb-12 w-full" aria-label="관련 콘텐츠">
        <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">
          {current.category} 더 보기
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {picked.map(item => (
            <Link
              key={item.slug}
              href={`${basePath}/${item.slug}`}
              className={`group flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-3 transition-all hover:shadow-sm ${c.hoverBorder}`}
            >
              <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg ${c.iconBg}`}>
                {item.icon}
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-bold text-slate-800 dark:text-slate-100 truncate transition-colors ${c.hoverText}`}>
                  {item.title}
                </span>
                <span className="block text-xs text-slate-400 dark:text-slate-500 truncate">{item.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
