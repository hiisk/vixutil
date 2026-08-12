import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import Game2048 from '@/components/game/Game2048';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '2048 게임 - 숫자를 밀어 합치는 퍼즐, 설치 없이 바로',
  description: '네 방향으로 판을 밀어 같은 수를 합칩니다. 한 번 밀 때 같은 칸은 한 번만 합쳐지므로 4·4·4·4는 8·8이 되고, 안 움직이는 방향으로 밀면 새 타일도 생기지 않습니다. 2048을 만든 뒤에도 계속 둘 수 있고 한 수 되돌리기가 있습니다.',
  alternates: {
    canonical: '/game/2048',
    languages: alternateLanguages10('/game/2048'),
  },
});

export default function Page() {
  return (
    <GameShell slug="2048">
      <Game2048 />
    </GameShell>
  );
}
