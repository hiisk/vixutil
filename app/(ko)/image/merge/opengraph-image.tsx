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
      icon: '🧩',
      eyebrow: 'Merge',
      title: '사진 이어붙이기',
      desc: '여러 장을 한 장으로 세로·가로 연결합니다',
      from: '#d946ef',
      to: '#0ea5e9',
    }),
  );
}
