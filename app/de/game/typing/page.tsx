import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'typing');

export default function DeGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="de">
      <TypingGame lang="de" />
    </GameShellIntl>
  );
}
