import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import PeripheralGame from '@/components/game/PeripheralGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'peripheral');

export default function ZhHantGamePeripheralPage() {
  return (
    <GameShellIntl slug="peripheral" lang="zh-hant">
      <PeripheralGame lang="zh-hant" />
    </GameShellIntl>
  );
}
