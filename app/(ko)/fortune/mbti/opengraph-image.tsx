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
      icon: '🧠',
      eyebrow: 'MBTI',
      title: 'MBTI 운세',
      desc: '16가지 성격 유형별 오늘의 운세',
      from: '#0ea5e9',
      to: '#2563eb',
    }),
  );
}
