import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧰',
      eyebrow: 'Device Check',
      title: '기기 점검',
      desc: '키보드·마우스·마이크·웹캠·모니터 온라인 테스트',
      from: '#0ea5e9',
      to: '#4f46e5',
    }),
    { ...size }
  );
}
