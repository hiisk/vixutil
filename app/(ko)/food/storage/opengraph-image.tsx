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
      icon: '🧊',
      eyebrow: 'Storage',
      title: '식품 보관 기간',
      desc: '냉장·냉동 며칠까지 괜찮을까',
      from: '#06b6d4',
      to: '#1d4ed8',
    }),
  );
}
