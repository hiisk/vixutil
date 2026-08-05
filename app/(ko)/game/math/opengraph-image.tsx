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
      icon: '➕',
      eyebrow: 'Mental Math',
      title: '암산 대결',
      desc: '30초 동안 몇 문제나 푸나',
      from: '#10b981',
      to: '#65a30d',
    }),
  );
}
