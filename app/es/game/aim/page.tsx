import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'aim');

export default function EsGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="es">
      <AimGame lang="es" />
    </GameShellIntl>
  );
}
