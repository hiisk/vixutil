import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '➕',
      eyebrow: 'Date Math',
      title: '날짜 더하기·빼기',
      desc: '이 날짜에서 며칠·몇 달 뒤는 언제',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
    { ...size }
  );
}
