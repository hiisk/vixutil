import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { WORLDCUPS, WORLDCUPS_MAP } from '@/lib/worldcup-data';
import WorldcupEngine from '@/components/WorldcupEngine';
import SiteFooter from '@/components/SiteFooter';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return WORLDCUPS.map(w => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = WORLDCUPS_MAP[slug];
  if (!w) return {};
  return {
    title: w.title,
    description: `${w.desc} — ${w.items.length}강 이상형 월드컵, 둘 중 하나 고르며 나의 최애 가리기`,
    alternates: { canonical: `/worldcup/${slug}` },
  };
}

export default async function WorldcupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = WORLDCUPS_MAP[slug];
  if (!w) notFound();
  const others = WORLDCUPS.filter(o => o.slug !== slug).slice(0, 6);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '이상형 월드컵', path: '/worldcup' },
          { name: w.title, path: `/worldcup/${slug}` },
        ])}
      />
      <WorldcupEngine worldcup={w} />
      <div className="max-w-2xl mx-auto px-4 w-full pb-10">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">다른 월드컵</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {others.map(o => (
            <Link
              key={o.slug}
              href={`/worldcup/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 text-center hover:-translate-y-0.5 hover:shadow transition-all"
            >
              <div className="text-2xl mb-1">{o.icon}</div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight line-clamp-2">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
