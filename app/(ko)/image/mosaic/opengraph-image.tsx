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
      icon: '🔳',
      eyebrow: 'Mosaic',
      title: '모자이크 가리기',
      desc: '얼굴·주소 등 가리고 싶은 곳을 문질러 지웁니다',
      from: '#475569',
      to: '#6d28d9',
    }),
  );
}
