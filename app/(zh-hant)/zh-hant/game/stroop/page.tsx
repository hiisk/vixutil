import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'stroop');

export default function ZhHantGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="zh-hant">
      <StroopGame lang="zh-hant" />
    </GameShellIntl>
  );
}
