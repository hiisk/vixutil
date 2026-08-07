import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'rotation');

export default function FrGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="fr">
      <RotationGame lang="fr" />
    </GameShellIntl>
  );
}
