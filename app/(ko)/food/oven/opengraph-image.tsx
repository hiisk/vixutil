import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🔥',
      eyebrow: 'Oven Temp',
      title: '오븐 온도 변환',
      desc: '화씨·가스마크·에어프라이어 환산',
      from: '#f97316',
      to: '#dc2626',
    }),
  );
}
