import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🖼️',
      eyebrow: 'Image Tools',
      title: '이미지 도구',
      desc: '용량 줄이기·크기 조절·자르기·모자이크를 브라우저에서',
      from: '#8b5cf6',
      to: '#0ea5e9',
    }),
  );
}
