import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NBackGame from '@/components/game/NBackGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'nback');

export default function FrGameNbackPage() {
  return (
    <GameShellIntl slug="nback" lang="fr">
      <NBackGame lang="fr" />
    </GameShellIntl>
  );
}
