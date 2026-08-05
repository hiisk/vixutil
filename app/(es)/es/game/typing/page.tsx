import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('es', 'typing');

export default function EsGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="es">
      <TypingGame lang="es" />
    </GameShellIntl>
  );
}
