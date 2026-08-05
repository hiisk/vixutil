import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🎨',
      eyebrow: 'Color Tools',
      title: '색상 도구',
      desc: '팔레트·대비 검사·그라디언트를 브라우저에서',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
  );
}
