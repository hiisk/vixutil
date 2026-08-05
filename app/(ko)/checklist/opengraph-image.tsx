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
      icon: '✅',
      eyebrow: 'Checklist',
      title: '상황별 체크리스트',
      desc: '이사 · 취업 · 여행 · 건강 등 70개+ 체크리스트',
      from: '#0ea5e9',
      to: '#0891b2',
    }),
  );
}
