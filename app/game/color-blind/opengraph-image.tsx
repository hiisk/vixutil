import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎨',
      eyebrow: 'Color',
      title: '색 구분 테스트',
      desc: '미세하게 다른 색 하나를 찾아내기',
      from: '#d946ef',
      to: '#7c3aed',
    }),
    { ...size }
  );
}
