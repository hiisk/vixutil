import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'typing');

export default function JaGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="ja">
      <TypingGame lang="ja" />
    </GameShellIntl>
  );
}
