import { ogImage } from '@/lib/og-image';
import { OG_SIZE, OG_CONTENT_TYPE, ogCard } from '@/lib/og-template';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export default function Image() {
  return ogImage(
    ogCard({
      icon: '🎮',
      eyebrow: 'Gamepad Test',
      title: '게임패드 테스트',
      desc: '버튼·아날로그 스틱·트리거 입력 확인',
      from: '#6366f1',
      to: '#06b6d4',
    }),
  );
}
