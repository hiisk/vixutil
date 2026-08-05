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
      icon: '📷',
      eyebrow: 'Webcam Test',
      title: '웹캠 테스트',
      desc: '화면·해상도·프레임레이트 확인 및 스냅샷',
      from: '#06b6d4',
      to: '#2563eb',
    }),
  );
}
