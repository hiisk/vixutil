import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'math');

export default function FrGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="fr">
      <MathGame lang="fr" />
    </GameShellIntl>
  );
}
