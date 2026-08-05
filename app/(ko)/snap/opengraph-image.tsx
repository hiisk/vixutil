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
      icon: '📸',
      eyebrow: 'Snap Test',
      title: '스냅테스트',
      desc: '사진 한 장으로 즐기는 참여형 테스트 모음',
      from: '#d946ef',
      to: '#0ea5e9',
    }),
  );
}
