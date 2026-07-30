import { notFound } from 'next/navigation';
import { localeAlternates } from '@/lib/locale-alternates';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CHECKLISTS_ZH, CHECKLISTS_ZH_MAP } from '@/lib/checklist-zh';
import ChecklistEngine from '@/components/ChecklistEngine';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return CHECKLISTS_ZH.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const checklist = CHECKLISTS_ZH_MAP[slug];
  if (!checklist) return {};
  const total = checklist.sections.reduce((s, sec) => s + sec.items.length, 0);
  return {
    title: `${checklist.title} — ${total} 项逐条核对`,
    description: `${checklist.desc}。共 ${total} 项，进度自动保存在浏览器。免费、免注册。`,
    alternates: {
      canonical: `/zh/checklist/${slug}`,
      languages: localeAlternates('checklist', slug),
    },
  };
}

export default async function ZhChecklistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const checklist = CHECKLISTS_ZH_MAP[slug];
  if (!checklist) notFound();
  const others = CHECKLISTS_ZH.filter(c => c.slug !== slug).slice(0, 6);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/zh/checklist' },
          { name: '清单', path: '/zh/checklist' },
          { name: checklist.title, path: `/zh/checklist/${slug}` },
        ])}
      />
      <ChecklistEngine checklist={checklist} lang="zh" />
      <div className="max-w-lg mx-auto px-4 w-full pb-10">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">更多清单</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/zh/checklist/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <div className="text-xl mb-1">{o.icon}</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/zh/checklist" className="text-sm font-black text-sky-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">
          免费清单 · <Link href={`/en/checklist/${slug}`} className="hover:text-sky-600" hrefLang="en">EN</Link>
        </p>
      </footer>
    </>
  );
}
