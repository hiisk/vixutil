import type { Metadata } from 'next';
import { alternateLanguages10 } from '@/lib/locales';
import GameShell from '@/components/GameShell';
import MinesweeperGame from '@/components/game/MinesweeperGame';
import { withCard } from '@/lib/og-cards';

export const metadata: Metadata = withCard({
  title: '지뢰찾기 - 초급·중급·고급 판을 브라우저에서 바로',
  description: '숫자는 맞닿은 여덟 칸에 든 지뢰 수입니다. 그것만으로 지뢰 자리를 좁혀 나가세요. 첫 칸은 언제나 안전하고 주변에도 지뢰가 없어 넓게 열리므로, 첫 수부터 찍지 않고 추론으로 시작할 수 있습니다.',
  alternates: {
    canonical: '/game/minesweeper',
    languages: alternateLanguages10('/game/minesweeper'),
  },
});

export default function Page() {
  return (
    <GameShell slug="minesweeper">
      <MinesweeperGame />
    </GameShell>
  );
}
