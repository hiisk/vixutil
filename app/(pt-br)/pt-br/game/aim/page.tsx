import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'aim');

export default function PtBrGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="pt-br">
      <AimGame lang="pt-br" />
    </GameShellIntl>
  );
}
