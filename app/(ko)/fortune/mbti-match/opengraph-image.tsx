import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🧠',
      eyebrow: 'MBTI 궁합',
      title: 'MBTI 궁합',
      desc: '두 사람의 MBTI로 보는 궁합',
      from: '#8b5cf6',
      to: '#4f46e5',
    }),
  );
}
