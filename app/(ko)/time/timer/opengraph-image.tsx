import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '⏲️',
      eyebrow: 'Timer',
      title: '타이머',
      desc: '시간을 정해두고 끝나면 소리로 알림',
      from: '#f43f5e',
      to: '#f97316',
    }),
  );
}
