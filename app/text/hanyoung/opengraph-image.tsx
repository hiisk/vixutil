import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '⌨️',
      eyebrow: 'Ko/En Keys',
      title: '한영타 변환기',
      desc: '한/영 안 바꾸고 친 글자를 되돌립니다',
      from: '#3b82f6',
      to: '#4f46e5',
    }),
  );
}
