import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'typing');

export default function HiGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="hi">
      <TypingGame lang="hi" />
    </GameShellIntl>
  );
}
