import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'math');

export default function DeGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="de">
      <MathGame lang="de" />
    </GameShellIntl>
  );
}
