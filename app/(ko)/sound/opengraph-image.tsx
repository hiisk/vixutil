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
      icon: '🔊',
      eyebrow: 'Sound Tools',
      title: '소리 도구',
      desc: '메트로놈·튜너·백색소음을 브라우저가 직접 만듭니다',
      from: '#6366f1',
      to: '#0ea5e9',
    }),
  );
}
