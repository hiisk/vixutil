import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'nback');

export default function EsGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="es">
      <NBackGame lang="es" />
    </GameShellIntl>
  );
}
