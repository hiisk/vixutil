import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'stroop');

export default function ZhHansGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="zh-hans">
      <StroopGame lang="zh-hans" />
    </GameShellIntl>
  );
}
