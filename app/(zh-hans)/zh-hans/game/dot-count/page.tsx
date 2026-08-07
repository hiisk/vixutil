import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'dot-count');

export default function ZhHansGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="zh-hans">
      <DotCountGame lang="zh-hans" />
    </GameShellIntl>
  );
}
