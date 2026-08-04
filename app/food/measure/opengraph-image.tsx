import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🥄',
      eyebrow: 'Measure',
      title: '계량 변환',
      desc: '컵·큰술을 그램으로 (재료별로 다릅니다)',
      from: '#f59e0b',
      to: '#ea580c',
    }),
  );
}
