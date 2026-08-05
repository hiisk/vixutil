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
      icon: '〰️',
      eyebrow: 'Tone Gen',
      title: '주파수 생성기',
      desc: '원하는 높이의 소리를 직접 만들기',
      from: '#475569',
      to: '#0284c7',
    }),
  );
}
