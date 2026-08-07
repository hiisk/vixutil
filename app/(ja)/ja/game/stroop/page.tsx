import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import StroopGame from '@/components/game/StroopGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'stroop');

export default function JaGameStroopPage() {
  return (
    <GameShellIntl slug="stroop" lang="ja">
      <StroopGame lang="ja" />
    </GameShellIntl>
  );
}
