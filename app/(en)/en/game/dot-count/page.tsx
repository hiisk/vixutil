import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'dot-count');

export default function EnGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="en">
      <DotCountGame lang="en" />
    </GameShellIntl>
  );
}
