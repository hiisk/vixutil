import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'dot-count');

export default function ZhHantGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="zh-hant">
      <DotCountGame lang="zh-hant" />
    </GameShellIntl>
  );
}
