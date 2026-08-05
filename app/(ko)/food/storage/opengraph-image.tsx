import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🧊',
      eyebrow: 'Storage',
      title: '식품 보관 기간',
      desc: '냉장·냉동 며칠까지 괜찮을까',
      from: '#06b6d4',
      to: '#1d4ed8',
    }),
  );
}
