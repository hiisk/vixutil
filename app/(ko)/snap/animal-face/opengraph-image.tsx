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
      icon: '🐾',
      eyebrow: 'Animal Face',
      title: '동물상 테스트',
      desc: '사진 한 장으로 보는 나의 동물상',
      from: '#f97316',
      to: '#db2777',
    }),
  );
}
