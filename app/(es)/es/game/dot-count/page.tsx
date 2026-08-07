import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'dot-count');

export default function EsGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="es">
      <DotCountGame lang="es" />
    </GameShellIntl>
  );
}
