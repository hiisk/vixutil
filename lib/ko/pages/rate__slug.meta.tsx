/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import type { Metadata } from 'next';
import { rateTool, RATE_TOOLS } from '@/lib/rate-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/text';
import { RATE_LANGS } from '@/lib/rate-section';
import { openGraphFor } from '@/lib/locales';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';
export function generateStaticParams() {
  return prerender(RATE_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = rateTool(slug);
  if (!tool) return {};
  const text = textOf(tool, 'ko');
  return withCard({
    title: text.title,
    description: text.long,
    openGraph: openGraphFor('ko'),
  alternates: { canonical: '/rate/' + slug, languages: sectionAlternates('rate', slug, RATE_LANGS) },
  });
}
