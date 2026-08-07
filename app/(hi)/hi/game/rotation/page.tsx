import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'rotation');

export default function HiGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="hi">
      <RotationGame lang="hi" />
    </GameShellIntl>
  );
}
