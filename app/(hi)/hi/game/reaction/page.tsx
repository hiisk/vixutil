import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'reaction');

export default function HiGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="hi">
      <ReactionGame lang="hi" />
    </GameShellIntl>
  );
}
