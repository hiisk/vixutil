import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'cps');

export default function ZhHansGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="zh-hans">
      <CpsGame lang="zh-hans" />
    </GameShellIntl>
  );
}
