import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔯',
      eyebrow: 'Saju',
      title: '사주 분석',
      desc: '생년월일로 사주 4주 분석 + 오행 균형',
      from: '#6366f1',
      to: '#6d28d9',
    }),
    { ...size }
  );
}
