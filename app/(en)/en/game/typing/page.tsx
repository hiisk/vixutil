import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'typing');

export default function EnGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="en">
      <TypingGame lang="en" />
    </GameShellIntl>
  );
}
