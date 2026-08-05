import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🔤',
      eyebrow: 'Initials',
      title: '초성 변환기',
      desc: '문장을 초성만 남겨 퀴즈로 만듭니다',
      from: '#8b5cf6',
      to: '#d946ef',
    }),
  );
}
