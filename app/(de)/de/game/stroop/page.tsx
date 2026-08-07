import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'stroop');

export default function DeGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="de">
      <StroopGame lang="de" />
    </GameShellIntl>
  );
}
