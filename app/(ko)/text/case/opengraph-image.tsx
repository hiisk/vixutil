import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🔠',
      eyebrow: 'Letter Case',
      title: '대소문자 변환',
      desc: '영문을 원하는 표기 방식으로 바꿉니다',
      from: '#475569',
      to: '#4338ca',
    }),
  );
}
