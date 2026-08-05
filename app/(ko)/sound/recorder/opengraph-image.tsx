import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🎙️',
      eyebrow: 'Recorder',
      title: '음성 녹음기',
      desc: '녹음해서 듣고 파일로 저장',
      from: '#d946ef',
      to: '#7c3aed',
    }),
  );
}
