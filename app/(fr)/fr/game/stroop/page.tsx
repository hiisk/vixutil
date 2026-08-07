import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'stroop');

export default function FrGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="fr">
      <StroopGame lang="fr" />
    </GameShellIntl>
  );
}
