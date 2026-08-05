import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'cps');

export default function PtBrGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="pt-br">
      <CpsGame lang="pt-br" />
    </GameShellIntl>
  );
}
