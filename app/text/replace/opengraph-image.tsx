import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🔍',
      eyebrow: 'Replace',
      title: '찾아 바꾸기',
      desc: '긴 글에서 특정 단어를 한 번에 치환',
      from: '#14b8a6',
      to: '#059669',
    }),
    { ...size }
  );
}
