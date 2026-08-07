import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'stroop');

export default function HiGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="hi">
      <StroopGame lang="hi" />
    </GameShellIntl>
  );
}
