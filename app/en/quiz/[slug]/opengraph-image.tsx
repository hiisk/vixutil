import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { QUIZZES_EN, QUIZZES_EN_MAP } from '@/lib/quiz-en';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return QUIZZES_EN.map(x => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZZES_EN_MAP[slug];
  if (!quiz) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    ogCard({
      icon: quiz.icon,
      eyebrow: `${quiz.category} QUIZ`,
      title: quiz.title,
      desc: `${quiz.questions.length} questions · ${quiz.desc}`,
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
