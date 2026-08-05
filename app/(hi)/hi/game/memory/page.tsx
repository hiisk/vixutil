import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'memory');

export default function HiGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="hi">
      <MemoryGame lang="hi" />
    </GameShellIntl>
  );
}
