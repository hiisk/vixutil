import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'math');

export default function JaGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="ja">
      <MathGame lang="ja" />
    </GameShellIntl>
  );
}
