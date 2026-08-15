/* 옮겨 옴 — components/SearchPageIntl.tsx의 searchMetaIntl().
   메타는 서버에 남고 뷰만 클라이언트에서 갈리므로, 메타 함수가 컴포넌트 파일 안에
   있으면 서버 그래프가 뷰에 닿아 청크가 도로 합쳐진다(components/FoldView.tsx 머리말). */
import { searchAlternates, SEARCH_INTL_UI, type SearchIntlLang } from '@/lib/search-index-intl';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

export function searchMetaIntl(lang: SearchIntlLang) {
  const ui = SEARCH_INTL_UI[lang];
  // 카드는 canonical에서 정해진다 — /og/<언어>/search를 그대로 쓴다
  return withCard({
    title: ui.title,
    description: ui.desc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, '/search'), languages: searchAlternates() },
  });
}
