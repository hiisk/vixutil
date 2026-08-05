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
      icon: '📈',
      eyebrow: '바이오리듬',
      title: '바이오리듬 계산기',
      desc: '신체·감성·지성 리듬 그래프',
      from: '#10b981',
      to: '#0d9488',
    }),
  );
}
