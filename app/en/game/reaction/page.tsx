import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'reaction');

export default function EnGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="en">
      <ReactionGame lang="en" />
    </GameShellIntl>
  );
}
