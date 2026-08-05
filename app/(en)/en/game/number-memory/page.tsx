import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'number-memory');

export default function EnGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="en">
      <NumberMemoryGame lang="en" />
    </GameShellIntl>
  );
}
