import type { Metadata } from 'next';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import GlobalSearchIntl from '@/components/GlobalSearchIntl';
import { searchIndexIntl, SEARCH_INTL_UI } from '@/lib/search-index-intl';

const UI = SEARCH_INTL_UI['zh'];

export const metadata: Metadata = {
  title: UI.title,
  description: UI.desc,
  alternates: {
    canonical: '/zh/search',
    // 한국어 /search는 계산기·크립토까지 포함한 다른 목록이라 짝으로 맺지 않는다
    languages: { 'en': '/en/search', 'zh': '/zh/search', 'x-default': '/en/search' },
  },
};

export default function ZhSearchPage() {
  const items = searchIndexIntl('zh');
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/zh" className="font-black text-indigo-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{UI.heading}</span>
          <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">{UI.countSuffix(items.length)}</span>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <h1 className="sr-only">{UI.h1}</h1>
        <GlobalSearchIntl items={items} lang="zh" />
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href="/zh" className="text-sm font-black text-indigo-600">vixutil</Link>
      </footer>
    </div>
  );
}
