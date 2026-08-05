import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🌊',
      eyebrow: 'White Noise',
      title: '백색소음',
      desc: '집중·수면을 돕는 잡음 만들기',
      from: '#0ea5e9',
      to: '#0891b2',
    }),
  );
}
