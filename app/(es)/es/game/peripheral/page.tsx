import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'peripheral');

export default function EsGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="es">
      <PeripheralGame lang="es" />
    </GameShellIntl>
  );
}
