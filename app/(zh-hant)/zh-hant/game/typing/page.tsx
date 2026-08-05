import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'typing');

export default function ZhHantGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="zh-hant">
      <TypingGame lang="zh-hant" />
    </GameShellIntl>
  );
}
