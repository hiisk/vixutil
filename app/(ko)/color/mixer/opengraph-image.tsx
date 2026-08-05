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
      icon: '🧪',
      eyebrow: 'Mixer',
      title: '색 섞기',
      desc: '두 색 사이의 중간색을 만들기',
      from: '#14b8a6',
      to: '#0284c7',
    }),
  );
}
