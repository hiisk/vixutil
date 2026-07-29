import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📷',
      eyebrow: 'Webcam Test',
      title: '웹캠 테스트',
      desc: '화면·해상도·프레임레이트 확인 및 스냅샷',
      from: '#06b6d4',
      to: '#2563eb',
    }),
    { ...size }
  );
}
