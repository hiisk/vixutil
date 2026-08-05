import { connection } from 'next/server';
import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  // 프리렌더를 여기서 멈춘다 — 카드는 처음 요청될 때 만든다
  await connection();
  return ogImage(
    ogCard({
      icon: '🏆',
      eyebrow: 'Quiz',
      title: '지식 퀴즈',
      desc: '한국사 · IT · 상식 · K-POP 등 100개+ 퀴즈',
      from: '#f59e0b',
      to: '#ea580c',
    }),
  );
}
