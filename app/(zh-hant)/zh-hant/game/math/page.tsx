import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'math');

export default function ZhHantGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="zh-hant">
      <MathGame lang="zh-hant" />
    </GameShellIntl>
  );
}
