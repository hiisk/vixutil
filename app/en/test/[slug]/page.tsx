import ToolIcon from '@/components/ToolIcon';
import { notFound } from 'next/navigation';
import { localeAlternates } from '@/lib/locale-alternates';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TESTS_EN, TESTS_EN_MAP } from '@/lib/test-en';
import TestEngine from '@/components/TestEngine';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return TESTS_EN.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const test = TESTS_EN_MAP[slug];
  if (!test) return {};
  return {
    title: `${test.title} — Free Personality Test`,
    description: `${test.desc}. Ten questions, about two minutes. Free, no sign-up.`,
    alternates: {
      canonical: '/en/test/' + slug,
      languages: localeAlternates('test', slug),
    },
  };
}

export default async function EnTestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TESTS_EN_MAP[slug];
  if (!test) notFound();
  const others = TESTS_EN.filter(t => t.slug !== slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/en/test' },
          { name: 'Tests', path: '/en/test' },
          { name: test.title, path: '/en/test/' + slug },
        ])}
      />
      <TestEngine test={test} lang="en" />
      <div className="max-w-lg mx-auto px-4 w-full pb-10">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">More tests</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/en/test/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <ToolIcon emoji={o.icon} className="text-slate-800 dark:text-slate-100 w-6 h-6 mx-auto mb-1" />
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/en/test" className="text-sm font-black text-violet-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">
          Free personality tests </p>
      </footer>
    </>
  );
}
