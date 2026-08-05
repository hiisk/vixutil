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
      icon: '✍️',
      eyebrow: 'Text Tools',
      title: '텍스트 도구',
      desc: '한영타 변환·영문 이름·특수문자·글자수를 한 곳에서',
      from: '#3b82f6',
      to: '#d946ef',
    }),
  );
}
