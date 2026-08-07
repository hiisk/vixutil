import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'peripheral');

export default function DeGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="de">
      <PeripheralGame lang="de" />
    </GameShellIntl>
  );
}
