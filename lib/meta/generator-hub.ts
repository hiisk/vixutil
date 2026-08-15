/* 옮겨 옴 — components/GeneratorIntlPage.tsx의 generatorIntlMeta().
   메타는 서버에 남고 뷰만 클라이언트에서 갈리므로, 메타 함수가 컴포넌트 파일 안에
   있으면 서버 그래프가 뷰에 닿아 청크가 도로 합쳐진다(components/FoldView.tsx 머리말). */
import { alternateLanguages10 } from '@/lib/locales';
import type { GeneratorIntlLang } from '@/lib/generator-l10n';
import { withCard } from '@/lib/og-cards';
import { UI } from './generator-hub-ui';

export function generatorIntlMeta(lang: GeneratorIntlLang) {
  const ui = UI[lang];
  // 카드는 canonical에서 정해진다 — /og/<언어>/generator를 그대로 쓴다
  return withCard({
    title: ui.metaTitle,
    description: ui.metaDesc,
    alternates: { canonical: `/${lang}/generator`, languages: alternateLanguages10('/generator') },
  });
}
