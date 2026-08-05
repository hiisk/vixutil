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
      icon: '🕹️',
      eyebrow: 'Brain Games',
      title: '두뇌 게임',
      desc: '반응속도·클릭속도·기억력을 1분 만에 재는 게임',
      from: '#10b981',
      to: '#4f46e5',
    }),
  );
}
