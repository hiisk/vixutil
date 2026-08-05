import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'math');

export default function PtBrGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="pt-br">
      <MathGame lang="pt-br" />
    </GameShellIntl>
  );
}
