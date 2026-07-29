import { ImageResponse } from 'next/og';
import { QUIZZES, QUIZ_MAP } from '@/lib/quiz-data';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return QUIZZES.map(q => ({ slug: q.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZ_MAP[slug];
  if (!quiz) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    ogCard({
      icon: quiz.icon,
      eyebrow: `${quiz.category} QUIZ`,
      title: quiz.title,
      desc: `${quiz.questions.length}문제 · ${quiz.desc}`,
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
