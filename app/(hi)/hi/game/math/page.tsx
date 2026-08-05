import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'math');

export default function HiGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="hi">
      <MathGame lang="hi" />
    </GameShellIntl>
  );
}
