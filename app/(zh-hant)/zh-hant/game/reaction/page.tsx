import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'reaction');

export default function ZhHantGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="zh-hant">
      <ReactionGame lang="zh-hant" />
    </GameShellIntl>
  );
}
