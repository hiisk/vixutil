import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'reaction');

export default function ZhHansGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="zh-hans">
      <ReactionGame lang="zh-hans" />
    </GameShellIntl>
  );
}
