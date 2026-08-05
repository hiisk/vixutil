import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🧩',
      eyebrow: 'Merge',
      title: '사진 이어붙이기',
      desc: '여러 장을 한 장으로 세로·가로 연결합니다',
      from: '#d946ef',
      to: '#0ea5e9',
    }),
  );
}
