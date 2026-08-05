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
      icon: '🌫️',
      eyebrow: 'Shadow',
      title: '그림자 만들기',
      desc: 'box-shadow를 눈으로 보며 조절',
      from: '#475569',
      to: '#4338ca',
    }),
  );
}
