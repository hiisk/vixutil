import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'memory');

export default function JaGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="ja">
      <MemoryGame lang="ja" />
    </GameShellIntl>
  );
}
