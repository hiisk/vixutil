import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'aim');

export default function DeGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="de">
      <AimGame lang="de" />
    </GameShellIntl>
  );
}
