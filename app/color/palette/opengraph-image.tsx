import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🎨',
      eyebrow: 'Palette',
      title: '팔레트 생성기',
      desc: '기준 색에 어울리는 색을 규칙대로 뽑기',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
  );
}
