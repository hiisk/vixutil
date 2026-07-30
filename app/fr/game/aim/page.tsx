import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'aim');

export default function FrGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="fr">
      <AimGame lang="fr" />
    </GameShellIntl>
  );
}
