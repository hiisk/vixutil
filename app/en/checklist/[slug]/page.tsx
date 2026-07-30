import ToolIcon from '@/components/ToolIcon';
import { notFound } from 'next/navigation';
import { localeAlternates } from '@/lib/locale-alternates';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CHECKLISTS_EN, CHECKLISTS_EN_MAP } from '@/lib/checklist-en';
import ChecklistEngine from '@/components/ChecklistEngine';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return CHECKLISTS_EN.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const checklist = CHECKLISTS_EN_MAP[slug];
  if (!checklist) return {};
  const total = checklist.sections.reduce((s, sec) => s + sec.items.length, 0);
  return {
    title: `${checklist.title} — ${total} Things to Tick Off`,
    description: `${checklist.desc}. ${total} items, progress saved in your browser. Free, no sign-up.`,
    alternates: {
      canonical: `/en/checklist/${slug}`,
      languages: localeAlternates('checklist', slug),
    },
  };
}

export default async function EnChecklistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const checklist = CHECKLISTS_EN_MAP[slug];
  if (!checklist) notFound();
  const others = CHECKLISTS_EN.filter(c => c.slug !== slug).slice(0, 6);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/en/checklist' },
          { name: 'Checklists', path: '/en/checklist' },
          { name: checklist.title, path: `/en/checklist/${slug}` },
        ])}
      />
      <ChecklistEngine checklist={checklist} lang="en" />
      <div className="max-w-lg mx-auto px-4 w-full pb-10">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">More checklists</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/en/checklist/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/en/checklist" className="text-sm font-black text-sky-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">
          Free checklists · <Link href={`/zh/checklist/${slug}`} className="hover:text-sky-600" hrefLang="zh">中文</Link>
        </p>
      </footer>
    </>
  );
}
