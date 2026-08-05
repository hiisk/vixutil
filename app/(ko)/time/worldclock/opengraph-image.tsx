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
      icon: '🌍',
      eyebrow: 'World Clock',
      title: '세계 시계',
      desc: '주요 도시의 지금 시각을 한눈에',
      from: '#06b6d4',
      to: '#2563eb',
    }),
  );
}
