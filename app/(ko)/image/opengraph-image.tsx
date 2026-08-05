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
      icon: '🖼️',
      eyebrow: 'Image Tools',
      title: '이미지 도구',
      desc: '용량 줄이기·크기 조절·자르기·모자이크를 브라우저에서',
      from: '#8b5cf6',
      to: '#0ea5e9',
    }),
  );
}
