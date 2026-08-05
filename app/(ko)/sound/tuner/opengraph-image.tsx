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
      icon: '🎸',
      eyebrow: 'Tuner',
      title: '악기 튜너',
      desc: '마이크로 소리를 듣고 음정을 알려줍니다',
      from: '#10b981',
      to: '#0d9488',
    }),
  );
}
