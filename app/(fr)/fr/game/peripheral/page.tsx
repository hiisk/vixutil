import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'peripheral');

export default function FrGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="fr">
      <PeripheralGame lang="fr" />
    </GameShellIntl>
  );
}
