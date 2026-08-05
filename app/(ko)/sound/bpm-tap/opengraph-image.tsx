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
      icon: '👏',
      eyebrow: 'Tap BPM',
      title: 'BPM 측정',
      desc: '박자에 맞춰 두드리면 템포를 알려줍니다',
      from: '#f59e0b',
      to: '#f43f5e',
    }),
  );
}
