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
      icon: '🖱️',
      eyebrow: 'Mouse Test',
      title: '마우스 클릭 테스트',
      desc: '좌·우·휠 클릭과 채터링(더블클릭 오작동) 검사',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
  );
}
