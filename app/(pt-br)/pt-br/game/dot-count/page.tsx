import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'dot-count');

export default function PtBrGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="pt-br">
      <DotCountGame lang="pt-br" />
    </GameShellIntl>
  );
}
