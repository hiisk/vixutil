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
      icon: '🎨',
      eyebrow: 'Color Tools',
      title: '색상 도구',
      desc: '팔레트·대비 검사·그라디언트를 브라우저에서',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
  );
}
