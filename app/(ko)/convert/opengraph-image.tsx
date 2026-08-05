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
      icon: '🔄',
      eyebrow: 'Unit Converter',
      title: '단위 변환',
      desc: '길이·무게·부피·넓이·온도까지 50가지 변환',
      from: '#3b82f6',
      to: '#4f46e5',
    }),
  );
}
