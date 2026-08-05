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
      icon: '📄',
      eyebrow: 'Lorem',
      title: '더미 텍스트 생성',
      desc: '레이아웃 채울 한글·영문 예시 문장',
      from: '#64748b',
      to: '#0284c7',
    }),
  );
}
