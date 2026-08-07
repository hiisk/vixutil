import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'beat');

export default function EsGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="es">
      <BeatGame lang="es" />
    </GameShellIntl>
  );
}
