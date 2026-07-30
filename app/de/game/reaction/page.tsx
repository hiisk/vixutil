import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'reaction');

export default function DeGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="de">
      <ReactionGame lang="de" />
    </GameShellIntl>
  );
}
