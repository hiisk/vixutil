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
      icon: '✂️',
      eyebrow: 'Crop',
      title: '이미지 자르기',
      desc: '필요한 부분만 잘라냅니다',
      from: '#f43f5e',
      to: '#f97316',
    }),
  );
}
