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
      icon: '🍅',
      eyebrow: 'Pomodoro',
      title: '뽀모도로 타이머',
      desc: '25분 집중 · 5분 휴식 반복',
      from: '#ef4444',
      to: '#e11d48',
    }),
  );
}
