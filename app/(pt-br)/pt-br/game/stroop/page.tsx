import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'stroop');

export default function PtBrGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="pt-br">
      <StroopGame lang="pt-br" />
    </GameShellIntl>
  );
}
