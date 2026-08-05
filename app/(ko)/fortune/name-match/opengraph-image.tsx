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
      icon: '💕',
      eyebrow: '이름 궁합',
      title: '이름 궁합',
      desc: '두 사람 이름 획수로 보는 궁합',
      from: '#ec4899',
      to: '#e11d48',
    }),
  );
}
