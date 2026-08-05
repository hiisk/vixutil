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
      icon: '🎵',
      eyebrow: 'Metronome',
      title: '메트로놈',
      desc: '박자를 정확히 짚어 주는 연습 도구',
      from: '#6366f1',
      to: '#7c3aed',
    }),
  );
}
