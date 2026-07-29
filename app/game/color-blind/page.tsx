import type { Metadata } from 'next';
import GameShell from '@/components/GameShell';
import ColorBlindGame from '@/components/game/ColorBlindGame';

export const metadata: Metadata = {
  title: '색 구분 테스트 - 미세한 색 차이 구별하기',
  description: '같은 색 사각형 사이에 딱 하나 다른 색이 섞여 있습니다. 단계가 오를수록 차이가 줄어들어 결국 구분이 안 되는 지점이 오는데, 그 지점이 곧 내 색 구분 한계입니다.',
  alternates: {
    canonical: '/game/color-blind',
    languages: { 'ko': '/game/color-blind', 'en': '/en/game/color-blind', 'zh': '/zh/game/color-blind', 'x-default': '/en/game/color-blind' },
  },
};

export default function Page() {
  return (
    <GameShell slug="color-blind">
      <ColorBlindGame />
    </GameShell>
  );
}
