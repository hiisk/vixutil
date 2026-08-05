import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🦟',
      eyebrow: 'Mosquito',
      title: '모기 소리',
      desc: '나이가 들면 안 들리는 고주파',
      from: '#84cc16',
      to: '#059669',
    }),
  );
}
