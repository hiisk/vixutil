import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'rotation');

export default function EsGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="es">
      <RotationGame lang="es" />
    </GameShellIntl>
  );
}
