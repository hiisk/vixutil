import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '⭐',
      eyebrow: '별자리 궁합',
      title: '별자리 궁합',
      desc: '12별자리 원소로 보는 두 사람의 궁합',
      from: '#8b5cf6',
      to: '#c026d3',
    }),
  );
}
