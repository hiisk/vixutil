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
      icon: '🗓️',
      eyebrow: 'Week No.',
      title: '주차·분기 확인',
      desc: '오늘이 몇 주차이고 몇 분기인지',
      from: '#475569',
      to: '#4338ca',
    }),
  );
}
