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
      icon: '⏱️',
      eyebrow: 'Stopwatch',
      title: '스톱워치',
      desc: '흐른 시간을 재고 구간마다 기록',
      from: '#0ea5e9',
      to: '#4f46e5',
    }),
  );
}
