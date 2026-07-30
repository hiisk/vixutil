import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'reaction');

export default function FrGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="fr">
      <ReactionGame lang="fr" />
    </GameShellIntl>
  );
}
