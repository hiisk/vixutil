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
      icon: '✨',
      eyebrow: 'Symbols',
      title: '특수문자 모음',
      desc: '화살표·도형·기호를 눌러서 복사',
      from: '#d946ef',
      to: '#7c3aed',
    }),
  );
}
