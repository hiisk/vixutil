import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'memory');

export default function EnGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="en">
      <MemoryGame lang="en" />
    </GameShellIntl>
  );
}
