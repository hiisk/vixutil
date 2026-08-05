import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'aim');

export default function ZhHansGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="zh-hans">
      <AimGame lang="zh-hans" />
    </GameShellIntl>
  );
}
