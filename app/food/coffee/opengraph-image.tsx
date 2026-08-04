import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '☕',
      eyebrow: 'Coffee',
      title: '커피 비율',
      desc: '원두와 물의 황금비율',
      from: '#b45309',
      to: '#9a3412',
    }),
  );
}
