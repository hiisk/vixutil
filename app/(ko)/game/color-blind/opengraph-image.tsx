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
      eyebrow: 'Color',
      title: '색 구분 테스트',
      desc: '미세하게 다른 색 하나를 찾아내기',
      from: '#d946ef',
      to: '#7c3aed',
    }),
  );
}
