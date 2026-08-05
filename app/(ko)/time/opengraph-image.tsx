import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '⏰',
      eyebrow: 'Time Tools',
      title: '시간 도구',
      desc: '타이머·스톱워치·세계시계·날짜 계산을 한 곳에서',
      from: '#0ea5e9',
      to: '#f43f5e',
    }),
  );
}
