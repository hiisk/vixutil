import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🗜️',
      eyebrow: 'Compress',
      title: '이미지 용량 줄이기',
      desc: '화질을 조절해 사진 파일 크기를 줄입니다',
      from: '#8b5cf6',
      to: '#4f46e5',
    }),
  );
}
