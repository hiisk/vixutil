import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '📸',
      eyebrow: 'Snap Test',
      title: '스냅테스트',
      desc: '사진 한 장으로 즐기는 참여형 테스트 모음',
      from: '#d946ef',
      to: '#0ea5e9',
    }),
    { ...size }
  );
}
