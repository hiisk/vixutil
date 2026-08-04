import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🛂',
      eyebrow: 'Romanize',
      title: '영문 이름 변환',
      desc: '여권·명함에 쓸 이름의 로마자 표기',
      from: '#10b981',
      to: '#0d9488',
    }),
  );
}
