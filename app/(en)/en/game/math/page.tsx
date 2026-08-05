import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'math');

export default function EnGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="en">
      <MathGame lang="en" />
    </GameShellIntl>
  );
}
