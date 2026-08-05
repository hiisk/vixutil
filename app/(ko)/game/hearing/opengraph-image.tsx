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
      icon: '👂',
      eyebrow: 'Hearing',
      title: '가청 주파수 테스트',
      desc: '몇 Hz까지 들리는지 확인',
      from: '#06b6d4',
      to: '#2563eb',
    }),
  );
}
