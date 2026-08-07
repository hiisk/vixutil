import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'peripheral');

export default function EnGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="en">
      <PeripheralGame lang="en" />
    </GameShellIntl>
  );
}
