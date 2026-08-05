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
      icon: '🧘',
      eyebrow: 'Binaural',
      title: '바이노럴 비트',
      desc: '좌우에 다른 주파수를 넣어 만드는 맥놀이',
      from: '#14b8a6',
      to: '#4f46e5',
    }),
  );
}
