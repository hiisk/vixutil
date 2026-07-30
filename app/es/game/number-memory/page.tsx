import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'number-memory');

export default function EsGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="es">
      <NumberMemoryGame lang="es" />
    </GameShellIntl>
  );
}
