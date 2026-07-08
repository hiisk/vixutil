import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '🧰',
      eyebrow: 'vixutil',
      title: '일상 도구 모음',
      desc: '계산기 · 운세 · 심리테스트 · 퀴즈 · 생성기 · 체크리스트',
      from: '#2563eb',
      to: '#7c3aed',
    }),
    { ...size }
  );
}
