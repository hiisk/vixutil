import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'cps');

export default function FrGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="fr">
      <CpsGame lang="fr" />
    </GameShellIntl>
  );
}
