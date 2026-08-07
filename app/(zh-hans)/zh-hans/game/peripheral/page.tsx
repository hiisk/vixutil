import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'peripheral');

export default function ZhHansGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="zh-hans">
      <PeripheralGame lang="zh-hans" />
    </GameShellIntl>
  );
}
