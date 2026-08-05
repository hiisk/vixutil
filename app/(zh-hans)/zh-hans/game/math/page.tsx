import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'math');

export default function ZhHansGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="zh-hans">
      <MathGame lang="zh-hans" />
    </GameShellIntl>
  );
}
