import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';
import { QUIZZES_ZH, QUIZZES_ZH_MAP } from '@/lib/quiz-zh';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return QUIZZES_ZH.map(x => ({ slug: x.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const quiz = QUIZZES_ZH_MAP[slug];
  if (!quiz) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    ogCard({
      icon: quiz.icon,
      eyebrow: `${quiz.category} QUIZ`,
      title: quiz.title,
      desc: `${quiz.questions.length}题 · ${quiz.desc}`,
      from: '#f59e0b',
      to: '#ea580c',
    }),
    { ...size }
  );
}
