import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🎲',
      eyebrow: 'Random',
      title: '랜덤 색 뽑기',
      desc: '마음에 드는 색은 잠그고 다시 뽑기',
      from: '#f43f5e',
      to: '#f97316',
    }),
  );
}
