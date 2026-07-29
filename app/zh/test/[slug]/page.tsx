import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { TESTS_ZH, TESTS_ZH_MAP } from '@/lib/test-zh';
import TestEngine from '@/components/TestEngine';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return TESTS_ZH.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const test = TESTS_ZH_MAP[slug];
  if (!test) return {};
  return {
    title: `${test.title} — 免费心理测试`,
    description: `${test.desc}. 十道题，约两分钟。免费、免注册。`,
    alternates: {
      canonical: '/zh/test/' + slug,
      languages: { 'en': '/en/test/' + slug, 'zh': '/zh/test/' + slug, 'x-default': '/en/test/' + slug },
    },
  };
}

export default async function ZhTestPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const test = TESTS_ZH_MAP[slug];
  if (!test) notFound();
  const others = TESTS_ZH.filter(t => t.slug !== slug);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/zh/test' },
          { name: '心理测试', path: '/zh/test' },
          { name: test.title, path: '/zh/test/' + slug },
        ])}
      />
      <TestEngine test={test} lang="zh" />
      <div className="max-w-lg mx-auto px-4 w-full pb-10">
        <h2 className="text-sm font-black text-slate-700 dark:text-slate-200 mb-3">更多测试</h2>
        <div className="grid grid-cols-2 gap-2">
          {others.map(o => (
            <Link key={o.slug} href={`/zh/test/${o.slug}`}
              className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 p-3 hover:-translate-y-0.5 hover:shadow transition-all">
              <div className="text-xl mb-1">{o.icon}</div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-tight">{o.title}</div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/zh/test" className="text-sm font-black text-violet-600">vixutil</Link>
        <p className="text-xs text-slate-400 mt-1">
          免费心理测试 · <Link href={`/en/test/${slug}`} className="hover:text-violet-600" hrefLang="en">EN</Link>
        </p>
      </footer>
    </>
  );
}
