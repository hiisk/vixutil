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
      icon: '⌨️',
      eyebrow: 'Typing',
      title: '타자 연습',
      desc: '한글 문장을 쳐서 타수와 정확도 측정',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
  );
}
