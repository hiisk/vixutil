import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '⚡',
      eyebrow: 'Refresh Rate',
      title: '모니터 주사율 테스트',
      desc: '내 화면이 실제 몇 Hz로 도는지 측정',
      from: '#f59e0b',
      to: '#f43f5e',
    }),
  );
}
