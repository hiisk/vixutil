import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'cps');

export default function ZhHantGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="zh-hant">
      <CpsGame lang="zh-hant" />
    </GameShellIntl>
  );
}
