import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'peripheral');

export default function JaGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="ja">
      <PeripheralGame lang="ja" />
    </GameShellIntl>
  );
}
