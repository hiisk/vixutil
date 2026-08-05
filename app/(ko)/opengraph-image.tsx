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
      icon: '🧰',
      eyebrow: 'vixutil',
      title: '일상 도구 모음',
      desc: '계산기 · 운세 · 심리테스트 · 퀴즈 · 생성기 · 체크리스트',
      from: '#2563eb',
      to: '#7c3aed',
    }),
  );
}
