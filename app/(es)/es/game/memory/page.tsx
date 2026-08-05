import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'memory');

export default function EsGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="es">
      <MemoryGame lang="es" />
    </GameShellIntl>
  );
}
