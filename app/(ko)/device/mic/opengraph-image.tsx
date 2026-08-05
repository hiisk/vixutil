import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🎤',
      eyebrow: 'Mic Test',
      title: '마이크 테스트',
      desc: '입력 볼륨 실시간 확인 + 녹음해서 들어보기',
      from: '#f43f5e',
      to: '#f97316',
    }),
  );
}
