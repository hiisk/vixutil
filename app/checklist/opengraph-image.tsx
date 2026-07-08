import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '✅',
      eyebrow: 'Checklist',
      title: '상황별 체크리스트',
      desc: '이사 · 취업 · 여행 · 건강 등 70개+ 체크리스트',
      from: '#0ea5e9',
      to: '#0891b2',
    }),
    { ...size }
  );
}
