import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'memory');

export default function DeGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="de">
      <MemoryGame lang="de" />
    </GameShellIntl>
  );
}
