import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'dot-count');

export default function HiGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="hi">
      <DotCountGame lang="hi" />
    </GameShellIntl>
  );
}
