import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '✍️',
      eyebrow: 'Text Tools',
      title: '텍스트 도구',
      desc: '한영타 변환·영문 이름·특수문자·글자수를 한 곳에서',
      from: '#3b82f6',
      to: '#d946ef',
    }),
  );
}
