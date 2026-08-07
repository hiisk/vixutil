import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'rotation');

export default function PtBrGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="pt-br">
      <RotationGame lang="pt-br" />
    </GameShellIntl>
  );
}
