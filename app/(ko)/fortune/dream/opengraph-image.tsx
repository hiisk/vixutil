import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🌙',
      eyebrow: 'Dream',
      title: '꿈 해몽',
      desc: '돼지·뱀·불 등 78가지 꿈의 의미 분석',
      from: '#334155',
      to: '#3730a3',
    }),
  );
}
