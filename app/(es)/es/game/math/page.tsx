import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'math');

export default function EsGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="es">
      <MathGame lang="es" />
    </GameShellIntl>
  );
}
