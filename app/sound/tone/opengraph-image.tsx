import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '〰️',
      eyebrow: 'Tone Gen',
      title: '주파수 생성기',
      desc: '원하는 높이의 소리를 직접 만들기',
      from: '#475569',
      to: '#0284c7',
    }),
  );
}
