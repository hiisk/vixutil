import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🩸',
      eyebrow: '혈액형 궁합',
      title: '혈액형 궁합',
      desc: '두 사람의 혈액형으로 보는 궁합',
      from: '#f43f5e',
      to: '#ea580c',
    }),
  );
}
