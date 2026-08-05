import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'cps');

export default function EsGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="es">
      <CpsGame lang="es" />
    </GameShellIntl>
  );
}
