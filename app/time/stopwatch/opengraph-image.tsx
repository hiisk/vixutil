import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '⏱️',
      eyebrow: 'Stopwatch',
      title: '스톱워치',
      desc: '흐른 시간을 재고 구간마다 기록',
      from: '#0ea5e9',
      to: '#4f46e5',
    }),
  );
}
