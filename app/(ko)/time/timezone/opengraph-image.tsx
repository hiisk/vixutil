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
      icon: '🕰️',
      eyebrow: 'Time Zones',
      title: '시차 계산',
      desc: '해외 회의 시간을 서로의 시각으로',
      from: '#6366f1',
      to: '#7c3aed',
    }),
  );
}
