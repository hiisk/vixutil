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
      eyebrow: 'Ko/En Keys',
      title: '한영타 변환기',
      desc: '한/영 안 바꾸고 친 글자를 되돌립니다',
      from: '#3b82f6',
      to: '#4f46e5',
    }),
  );
}
