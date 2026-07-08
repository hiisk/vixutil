import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🎨',
      eyebrow: 'Personal Color',
      title: '퍼스널컬러 진단',
      desc: '사진 한 장으로 보는 웜톤·쿨톤 컬러 진단',
      from: '#fb923c',
      to: '#6366f1',
    }),
    { ...size }
  );
}
