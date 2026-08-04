import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '👁️',
      eyebrow: 'Contrast',
      title: '명도 대비 검사',
      desc: '글자가 읽히는지 WCAG 기준으로 확인',
      from: '#10b981',
      to: '#0d9488',
    }),
  );
}
