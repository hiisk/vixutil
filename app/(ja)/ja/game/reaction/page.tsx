import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'reaction');

export default function JaGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="ja">
      <ReactionGame lang="ja" />
    </GameShellIntl>
  );
}
