import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'typing');

export default function ZhHansGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="zh-hans">
      <TypingGame lang="zh-hans" />
    </GameShellIntl>
  );
}
