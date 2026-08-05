import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🔄',
      eyebrow: 'Convert',
      title: '이미지 포맷 변환',
      desc: 'JPG·PNG·WebP 사이에서 형식을 바꿉니다',
      from: '#10b981',
      to: '#0d9488',
    }),
  );
}
