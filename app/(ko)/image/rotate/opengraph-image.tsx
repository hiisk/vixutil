import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🔃',
      eyebrow: 'Rotate',
      title: '이미지 회전·반전',
      desc: '돌아간 사진을 바로 세우고 좌우를 뒤집습니다',
      from: '#f59e0b',
      to: '#f43f5e',
    }),
  );
}
