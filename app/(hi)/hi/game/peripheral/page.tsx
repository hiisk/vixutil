import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'peripheral');

export default function HiGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="hi">
      <PeripheralGame lang="hi" />
    </GameShellIntl>
  );
}
