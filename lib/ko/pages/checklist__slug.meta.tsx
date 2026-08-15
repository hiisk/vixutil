/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import { hasAlternates, localeAlternates, localesWithItem } from '@/lib/locale-alternates';
import type { Metadata } from 'next';
import { CHECKLISTS, CHECKLISTS_MAP } from '@/lib/checklist-data';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';
export function generateStaticParams() {
  return prerender(CHECKLISTS.map(c => ({ slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const checklist = CHECKLISTS_MAP[slug];
  if (!checklist) return {};
  const total = checklist.sections.reduce((s, sec) => s + sec.items.length, 0);
  return withCard({
    title: checklist.title,
    description: `${checklist.desc} — ${total}개 항목, 진행 상황 자동 저장`,
    alternates: {
      canonical: `/checklist/${slug}`,
      // 언어별로 내용을 따로 쓴 섹션이라 슬러그가 겹치는 것만 짝으로 맺는다
      ...(hasAlternates('checklist', slug) ? { languages: localeAlternates('checklist', slug) } : {}),
    },
  });
}
