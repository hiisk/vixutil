/* 생성됨(gen.mjs) — 메타 전용. 그리는 것은 같은 이름의 원본 모듈에 있고
   components/FoldView.tsx가 클라이언트에서 따로 부른다. 까닭은 lib/ko/registry-meta.ts. */
import { hasAlternates, localeAlternates, localesWithItem } from '@/lib/locale-alternates';
import type { Metadata } from 'next';
import { QUIZZES, QUIZ_MAP } from '@/lib/quiz-data';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';
export function generateStaticParams() {
  return prerender(QUIZZES.map(q => ({ slug: q.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const quiz = QUIZ_MAP[slug];
  if (!quiz) return {};
  // ShareButton이 달린 206장이 여기서 카드를 못 받고 있었다 — /og/ko/quiz를 물려받는다
  return withCard({ title: quiz.title, description: quiz.desc, alternates: {
      canonical: `/quiz/${slug}`,
      // 언어별로 내용을 따로 쓴 섹션이라 슬러그가 겹치는 것만 짝으로 맺는다
      ...(hasAlternates('quiz', slug) ? { languages: localeAlternates('quiz', slug) } : {}),
    } });
}
