import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'stroop');

export default function EsGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="es">
      <StroopGame lang="es" />
    </GameShellIntl>
  );
}
