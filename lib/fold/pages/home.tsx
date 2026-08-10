import type { Metadata } from 'next';
import LocaleHome from '@/components/LocaleHome';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages10, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/./page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /* 화면은 components/LocaleHome.tsx 하나를 아홉 언어가 같이 쓴다 */
  const metadata: Metadata = withCard({
    // absolute로 둔다. 문구가 이미 vixutil로 시작하니 템플릿을 붙이면 두 번 나온다
    title: { absolute: HOME_UI[lang].metaTitle },
    description: HOME_UI[lang].metaDesc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: `/${lang}`, languages: alternateLanguages10('/') },
  });

  function Page() {
    return <LocaleHome lang={lang} />;
  }

  return { metadata, Page };
}
