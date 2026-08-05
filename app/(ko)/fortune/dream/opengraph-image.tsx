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
      icon: '🌙',
      eyebrow: 'Dream',
      title: '꿈 해몽',
      desc: '돼지·뱀·불 등 78가지 꿈의 의미 분석',
      from: '#334155',
      to: '#3730a3',
    }),
  );
}
