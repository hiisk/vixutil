import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import GlobalSearchIntl from '@/components/GlobalSearchIntl';
import SectionShortcuts from '@/components/SectionShortcuts';
import { searchIndexIntl, searchAlternates, SEARCH_INTL_UI, type SearchIntlLang } from '@/lib/search-index-intl';
import { localeHref, openGraphFor } from '@/lib/locales';
import LangPicker from '@/components/LangPicker';
import { withCard } from '@/lib/og-cards';

/**
 * 통합 검색 화면 — 번역 일곱 언어가 이 컴포넌트 하나를 쓴다.
 *
 * 라우트마다 화면을 복사해 두면 언어마다 조금씩 달라진다. 특히 이 페이지는
 * 헤더의 홈 링크가 언어별로 다른 주소라서, 복사본에서는 그 한 줄이 영어를
 * 가리킨 채로 남기 쉽다.
 */
export { searchMetaIntl } from '@/lib/meta/search-hub';

export default function SearchPageIntl({ lang }: { lang: SearchIntlLang }) {
  const ui = SEARCH_INTL_UI[lang];
  const items = searchIndexIntl(lang);
  const home = localeHref(lang, '/');

  return (
    <div className="page-wrap flex flex-col">
      <PageGlow accent="indigo" />
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={home} className="font-bold text-indigo-600 text-lg shrink-0">vix.</Link>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ui.heading}</span>
          <span className="ml-auto flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-400 dark:text-slate-500">{ui.countSuffix(items.length)}</span>
            {/*
              한국어 /search는 계산기·크립토까지 담은 다른 목록이라 hreflang에서는
              뺀다(searchAlternates). 버튼은 별개다 — 사람이 한국어 검색으로
              건너가는 건 막을 이유가 없고, 페이지도 실제로 있다.
            */}
            <LangPicker current={lang} route="/search" />
          </span>
        </div>
      </header>

      <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full">
        <h1 className="sr-only">{ui.h1}</h1>
        {/* 질의가 없을 때의 빈 자리 — 여기 푸터에는 섹션 목록이 아예 없었다 */}
        <GlobalSearchIntl items={items} lang={lang} empty={<SectionShortcuts lang={lang} />} />
      </div>

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center">
        <Link href={home} className="text-sm font-bold text-indigo-600">vixutil</Link>
      </footer>
    </div>
  );
}
