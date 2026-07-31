import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'memory');

export default function ZhHantGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="zh-hant">
      <MemoryGame lang="zh-hant" />
    </GameShellIntl>
  );
}
