import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🔢',
      eyebrow: 'Numbers',
      title: '숫자 암기 테스트',
      desc: '점점 길어지는 숫자를 외워서 입력',
      from: '#6366f1',
      to: '#7c3aed',
    }),
  );
}
