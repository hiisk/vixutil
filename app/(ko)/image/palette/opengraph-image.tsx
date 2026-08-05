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
      icon: '🎨',
      eyebrow: 'Palette',
      title: '이미지 색상 추출',
      desc: '사진에서 많이 쓰인 색을 뽑아 HEX로 보여줍니다',
      from: '#ec4899',
      to: '#7c3aed',
    }),
  );
}
