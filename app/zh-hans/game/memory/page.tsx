import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'memory');

export default function ZhHansGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="zh-hans">
      <MemoryGame lang="zh-hans" />
    </GameShellIntl>
  );
}
