import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'peripheral');

export default function PtBrGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="pt-br">
      <PeripheralGame lang="pt-br" />
    </GameShellIntl>
  );
}
