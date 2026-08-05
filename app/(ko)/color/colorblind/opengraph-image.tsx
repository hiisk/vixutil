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
      icon: '👓',
      eyebrow: 'CVD Sim',
      title: '색맹 시뮬레이터',
      desc: '색각 이상이 있는 눈에 어떻게 보이는지',
      from: '#f59e0b',
      to: '#f43f5e',
    }),
  );
}
