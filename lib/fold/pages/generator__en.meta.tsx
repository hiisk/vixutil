/* 생성됨(gen.mjs) — 메타 전용. 뷰(<Page/>)는 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 여기서 뷰를 부르면
   서버 그래프가 클라이언트 컴포넌트에 닿아 라우트의 청크가 도로 합쳐진다. */
import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';
/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(en)/en/generator/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function buildMeta(lang: FoldLang) {
  const metadata: Metadata = withCard({
    title: 'Free Name Generators — Fantasy, Sci-Fi & More',
    description: 'Free online name generators: fantasy, sci-fi, dragon, superhero, villain, guild, pirate names and more. Instant, unlimited, no sign-up.',
    alternates: {
      canonical: '/en/generator',
      // 여덟 언어판이 /en/generator를 가리키는데 여기서 되받지 않으면 상호 참조가
      // 끊겨 구글이 이 hreflang 묶음을 무시한다 — 열 언어를 모두 선언한다.
      languages: alternateLanguages10('/generator'),
    },
  });

  const CARD_GRADIENTS = [
    'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600', 'from-rose-500 to-pink-600',
    'from-sky-500 to-blue-600', 'from-amber-400 to-orange-500', 'from-fuchsia-500 to-rose-500',
  ];

  return { metadata };
}
