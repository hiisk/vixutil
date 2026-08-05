import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🍳',
      eyebrow: 'Cooking Tools',
      title: '계량·요리',
      desc: '컵을 그램으로, 레시피 배율, 오븐 온도까지',
      from: '#f59e0b',
      to: '#dc2626',
    }),
  );
}
