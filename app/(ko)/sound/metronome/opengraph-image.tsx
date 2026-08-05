import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🎵',
      eyebrow: 'Metronome',
      title: '메트로놈',
      desc: '박자를 정확히 짚어 주는 연습 도구',
      from: '#6366f1',
      to: '#7c3aed',
    }),
  );
}
