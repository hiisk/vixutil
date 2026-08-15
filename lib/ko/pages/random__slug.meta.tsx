/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '@/lib/random-tools';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';
export function generateStaticParams() {
  return prerender(RANDOM_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = RANDOM_TOOLS_MAP[slug];
  if (!t) return {};
  return withCard({
    title: t.title,
    description: t.long,
    alternates: {
      canonical: `/random/${slug}`,
      languages: alternateLanguages10(`/random/${slug}`),
    },
  });
}
