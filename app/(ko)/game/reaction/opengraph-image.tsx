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
      icon: '⚡',
      eyebrow: 'Reaction',
      title: '반응속도 테스트',
      desc: '초록불이 켜지면 얼마나 빨리 누르나',
      from: '#10b981',
      to: '#0d9488',
    }),
  );
}
