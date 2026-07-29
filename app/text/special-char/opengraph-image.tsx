import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '✨',
      eyebrow: 'Symbols',
      title: '특수문자 모음',
      desc: '화살표·도형·기호를 눌러서 복사',
      from: '#d946ef',
      to: '#7c3aed',
    }),
    { ...size }
  );
}
