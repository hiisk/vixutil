/* 생성됨(gen.mjs) — 메타 전용. 뷰(<Page/>)는 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 여기서 뷰를 부르면
   서버 그래프가 클라이언트 컴포넌트에 닿아 라우트의 청크가 도로 합쳐진다. */
import type { Metadata } from 'next';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages10, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';
/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/./page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function buildMeta(lang: FoldLang) {
  /* 화면은 components/LocaleHome.tsx 하나를 아홉 언어가 같이 쓴다 */
  const metadata: Metadata = withCard({
    // absolute로 둔다. 문구가 이미 vixutil로 시작하니 템플릿을 붙이면 두 번 나온다
    title: { absolute: HOME_UI[lang].metaTitle },
    description: HOME_UI[lang].metaDesc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: `/${lang}`, languages: alternateLanguages10('/') },
  });

  return { metadata };
}
