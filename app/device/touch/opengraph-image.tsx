import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '👆',
      eyebrow: 'Touch Test',
      title: '터치스크린 테스트',
      desc: '멀티터치 인식 개수와 안 먹는 영역 확인',
      from: '#ec4899',
      to: '#7c3aed',
    }),
  );
}
