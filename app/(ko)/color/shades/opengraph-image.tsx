import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🪜',
      eyebrow: 'Shades',
      title: '명도 단계 생성',
      desc: '색 하나로 50~900 단계 만들기',
      from: '#6366f1',
      to: '#7c3aed',
    }),
  );
}
