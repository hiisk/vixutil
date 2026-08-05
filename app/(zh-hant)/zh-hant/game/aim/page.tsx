import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'aim');

export default function ZhHantGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="zh-hant">
      <AimGame lang="zh-hant" />
    </GameShellIntl>
  );
}
