import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🙂',
      eyebrow: 'Kaomoji',
      title: '이모티콘 모음',
      desc: '(╯°□°）╯ 같은 문자 이모티콘 복사',
      from: '#f97316',
      to: '#f43f5e',
    }),
    { ...size }
  );
}
