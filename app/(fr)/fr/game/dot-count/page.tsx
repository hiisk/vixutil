import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'dot-count');

export default function FrGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="fr">
      <DotCountGame lang="fr" />
    </GameShellIntl>
  );
}
