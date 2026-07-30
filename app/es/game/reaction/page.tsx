import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'reaction');

export default function EsGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="es">
      <ReactionGame lang="es" />
    </GameShellIntl>
  );
}
