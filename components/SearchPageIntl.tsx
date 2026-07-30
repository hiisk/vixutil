import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import GlobalSearchIntl from '@/components/GlobalSearchIntl';
import { searchIndexIntl, searchAlternates, SEARCH_INTL_UI, type SearchIntlLang } from '@/lib/search-index-intl';
import { localeHref, openGraphFor } from '@/lib/locales';

/**
 * 통합 검색 화면 — 번역 일곱 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 라우트마다 화면을 복사해 두면 언어마다 조금씩 달라진다. 특히 이 페이지는
 * 헤더의 홈 링크가 언어별로 다른 주소라서, 복사본에서는 그 한 줄이 영어를
 * 가리킨 채로 남기 쉽다.
 */
export function searchMetaIntl(lang: SearchIntlLang) {
  const ui = SEARCH_INTL_UI[lang];
  return {
    title: ui.title,
    description: ui.desc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, '/search'), languages: searchAlternates() },
  };
}

export default function SearchPageIntl({ lang }: { lang: SearchIntlLang }) {
  const ui = SEARCH_INTL_UI[lang];
  const items = searchIndexIntl(lang);
  const home = localeHref(lang, '/');

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 flex flex-col">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={home} className="font-black text-indigo-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.heading}</span>
          <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">{ui.countSuffix(items.length)}</span>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <h1 className="sr-only">{ui.h1}</h1>
        <GlobalSearchIntl items={items} lang={lang} />
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={home} className="text-sm font-black text-indigo-600">vixutil</Link>
      </footer>
    </div>
  );
}
