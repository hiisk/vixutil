import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '⚙️',
      eyebrow: 'Generator',
      title: '생성기 모음',
      desc: '닉네임 · 비밀번호 · 추천 · 명언 등 100개+ 생성기',
      from: '#10b981',
      to: '#0d9488',
    }),
    { ...size }
  );
}
