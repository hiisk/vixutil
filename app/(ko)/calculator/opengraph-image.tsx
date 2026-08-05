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
      icon: '🧮',
      eyebrow: 'Calculator',
      title: '실생활 계산기',
      desc: '세금 · 금융 · 대출 · 부동산 · 건강 등 85개+ 계산기',
      from: '#1d4ed8',
      to: '#3b82f6',
    }),
  );
}
