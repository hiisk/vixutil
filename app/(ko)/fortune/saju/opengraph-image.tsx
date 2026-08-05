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
      icon: '🔯',
      eyebrow: 'Saju',
      title: '사주 분석',
      desc: '생년월일로 사주 4주 분석 + 오행 균형',
      from: '#6366f1',
      to: '#6d28d9',
    }),
  );
}
