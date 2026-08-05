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
      icon: '⚙️',
      eyebrow: 'Generator',
      title: '생성기 모음',
      desc: '닉네임 · 비밀번호 · 추천 · 명언 등 100개+ 생성기',
      from: '#10b981',
      to: '#0d9488',
    }),
  );
}
