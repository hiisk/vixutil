import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'number-memory');

export default function JaGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="ja">
      <NumberMemoryGame lang="ja" />
    </GameShellIntl>
  );
}
