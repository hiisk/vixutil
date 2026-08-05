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
      icon: '🎮',
      eyebrow: 'Gamepad Test',
      title: '게임패드 테스트',
      desc: '버튼·아날로그 스틱·트리거 입력 확인',
      from: '#6366f1',
      to: '#06b6d4',
    }),
  );
}
