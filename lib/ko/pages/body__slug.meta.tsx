/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import { BODY_LANGS } from '@/lib/body-section';
import type { Metadata } from 'next';
import { bodyTool, BODY_TOOLS } from '@/lib/body-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';
export function generateStaticParams() {
  return prerender(BODY_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = bodyTool(slug);
  if (!tool) return {};
  const text = tool['ko'];
  return withCard({
    title: text.title,
    description: text.long,
    alternates: { canonical: '/body/' + slug, languages: sectionAlternates('body', slug, BODY_LANGS) },
  });
}
