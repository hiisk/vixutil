import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'stroop');

export default function EnGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="en">
      <StroopGame lang="en" />
    </GameShellIntl>
  );
}
