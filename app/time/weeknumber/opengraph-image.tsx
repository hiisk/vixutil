import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🗓️',
      eyebrow: 'Week No.',
      title: '주차·분기 확인',
      desc: '오늘이 몇 주차이고 몇 분기인지',
      from: '#475569',
      to: '#4338ca',
    }),
  );
}
