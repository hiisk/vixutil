import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'dot-count');

export default function JaGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="ja">
      <DotCountGame lang="ja" />
    </GameShellIntl>
  );
}
