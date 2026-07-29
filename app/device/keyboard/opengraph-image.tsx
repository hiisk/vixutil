import { ImageResponse } from 'next/og';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return new ImageResponse(
    ogCard({
      icon: '⌨️',
      eyebrow: 'Keyboard Test',
      title: '키보드 테스트',
      desc: '안 눌리는 키·동시입력(N키 롤오버) 확인',
      from: '#0ea5e9',
      to: '#4f46e5',
    }),
    { ...size }
  );
}
