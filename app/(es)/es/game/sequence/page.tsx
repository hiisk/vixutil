import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'sequence');

export default function EsGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="es">
      <SequenceGame lang="es" />
    </GameShellIntl>
  );
}
