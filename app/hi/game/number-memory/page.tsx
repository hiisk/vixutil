import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'number-memory');

export default function HiGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="hi">
      <NumberMemoryGame lang="hi" />
    </GameShellIntl>
  );
}
