/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import type { Metadata } from 'next';
import { GENERATORS, GENERATOR_MAP } from '@/lib/generator-data';
import { EN_GENERATOR_SLUGS } from '@/lib/generator-en';
import { alternateLanguages10 } from '@/lib/locales';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';
export function generateStaticParams() {
  return prerender(GENERATORS.map(g => ({ slug: g.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gen = GENERATOR_MAP[slug];
  if (!gen) return {};
  /*
   * 번역판이 있는 스무 개만 hreflang을 단다 — 나머지 백여든넷은 한국어뿐이라
   * 대안이 없다. EN_GENERATOR_SLUGS가 그 스무 개이고, 아홉 언어가 모두 같은
   * 슬러그를 쓰므로 열 언어를 그대로 선언해도 404가 나지 않는다.
   *
   * 예전에는 여기서 영어만 선언했다. 그래서 독일어판이 한국어를 가리키는데
   * 한국어는 독일어를 안 가리키는 짝짝이가 됐고, 구글은 한쪽만 걸린 hreflang을
   * 짝으로 인정하지 않는다 — 페이지는 멀쩡한데 연결만 끊겨 있었다.
   */
  const translated = EN_GENERATOR_SLUGS.has(slug);
  return withCard({
    title: gen.title,
    description: gen.desc,
    alternates: {
      canonical: `/generator/${slug}`,
      ...(translated ? { languages: alternateLanguages10(`/generator/${slug}`) } : {}),
    },
  });
}
