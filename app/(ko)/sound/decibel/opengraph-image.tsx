import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '📢',
      eyebrow: 'Decibel',
      title: '소음 측정',
      desc: '주변이 얼마나 시끄러운지 재기',
      from: '#f43f5e',
      to: '#f97316',
    }),
  );
}
