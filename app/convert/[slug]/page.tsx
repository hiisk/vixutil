import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CONVERT_TOOLS, CONVERT_MAP, relatedConvertTools } from '@/lib/convert-tools';
import { convertFaq } from '@/lib/convert-faq';
import ConvertEngine from '@/components/ConvertEngine';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import PageGlow from '@/components/PageGlow';
import JsonLd, { breadcrumbJsonLd, webAppJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return CONVERT_TOOLS.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = CONVERT_MAP[slug];
  if (!tool) return {};
  return {
    title: tool.metaTitle,
    description: tool.long,
    alternates: { canonical: `/convert/${slug}` },
  };
}

export default async function ConvertPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = CONVERT_MAP[slug];
  if (!tool) notFound();

  const path = `/convert/${slug}`;
  const related = relatedConvertTools(slug);

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '단위 변환', path: '/convert' },
          { name: tool.title, path },
        ])}
      />
      <JsonLd data={webAppJsonLd(tool.title, tool.long, path)} />

      <PageGlow accent="blue" />
      <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />

      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            홈
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <Link href="/convert" className="text-sm text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-medium">
            단위 변환
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{tool.title}</span>
        </div>
      </header>

      <main className="relative max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
            <span>{tool.icon}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mb-2.5">{tool.title} 변환</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">{tool.long}</p>
        </div>

        <ConvertEngine tool={tool} />

        <Faq items={convertFaq(tool)} />

        <section className="mt-8" aria-label="다른 단위 변환">
          <h2 className="text-base font-black text-slate-800 dark:text-slate-100 mb-3">다른 단위 변환</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`/convert/${r.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="text-xl shrink-0">{r.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 transition-colors">
                    {r.title}
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 truncate">{r.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-9 leading-relaxed">
          전통 단위(근·되·마지기 등)는 지역과 품목에 따라 값이 다를 수 있습니다.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
