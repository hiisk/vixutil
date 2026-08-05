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
      icon: '🗜️',
      eyebrow: 'Compress',
      title: '이미지 용량 줄이기',
      desc: '화질을 조절해 사진 파일 크기를 줄입니다',
      from: '#8b5cf6',
      to: '#4f46e5',
    }),
  );
}
