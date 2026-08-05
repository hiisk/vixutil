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
      icon: '👂',
      eyebrow: 'Ear Training',
      title: '음정 듣기 훈련',
      desc: '들려주는 두 음의 관계 맞히기',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
  );
}
