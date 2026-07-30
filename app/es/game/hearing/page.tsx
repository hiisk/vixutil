import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'hearing');

export default function EsGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="es">
      <HearingGame lang="es" />
    </GameShellIntl>
  );
}
