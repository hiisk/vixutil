/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import type { Metadata } from 'next';
import { METRO_LINES, metroLine } from '@/lib/metro-lines';
import { detailMetadata } from '@/lib/metro/route';
import { prerender } from '@/lib/prerender';
export function generateStaticParams() {
  return prerender(METRO_LINES.map(l => ({ slug: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}
