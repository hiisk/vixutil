/* 옮겨 옴 — components/calc/CalcIntlHub.tsx의 calcIntlHubMeta().
   메타는 서버에 남고 뷰만 클라이언트에서 갈리므로, 메타 함수가 컴포넌트 파일 안에
   있으면 서버 그래프가 뷰에 닿아 청크가 도로 합쳐진다(components/FoldView.tsx 머리말). */
import { CALC_SHELL } from '@/lib/calc-l10n';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { alternateLanguages10, localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

export function calcIntlHubMeta(lang: CalcLang) {
  const ui = CALC_SHELL[lang];
  // 허브까지 통째로 카드가 없었다 — /og/<언어>/calculator를 canonical에서 찾아 붙인다
  return withCard({
    title: ui.hubMetaTitle,
    description: ui.hubMetaDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/calculator'),
      languages: alternateLanguages10('/calculator'),
    },
  });
}
