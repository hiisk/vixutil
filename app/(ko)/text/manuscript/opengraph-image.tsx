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
      icon: '📝',
      eyebrow: 'Count',
      title: '원고지·자소서 글자수',
      desc: '원고지 매수와 자소서 기준 글자수 계산',
      from: '#6366f1',
      to: '#7c3aed',
    }),
  );
}
