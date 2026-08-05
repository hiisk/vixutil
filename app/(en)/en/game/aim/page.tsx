import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'aim');

export default function EnGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="en">
      <AimGame lang="en" />
    </GameShellIntl>
  );
}
