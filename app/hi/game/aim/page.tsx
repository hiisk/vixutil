import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'aim');

export default function HiGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="hi">
      <AimGame lang="hi" />
    </GameShellIntl>
  );
}
