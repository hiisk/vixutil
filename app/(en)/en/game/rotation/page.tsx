import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'rotation');

export default function EnGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="en">
      <RotationGame lang="en" />
    </GameShellIntl>
  );
}
