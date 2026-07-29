import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🖱️',
      eyebrow: 'Mouse Test',
      title: '마우스 클릭 테스트',
      desc: '좌·우·휠 클릭과 채터링(더블클릭 오작동) 검사',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
    { ...size }
  );
}
