import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import DotCountGame from '@/components/game/DotCountGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'dot-count');

export default function DeGameDotCountPage() {
  return (
    <GameShellIntl slug="dot-count" lang="de">
      <DotCountGame lang="de" />
    </GameShellIntl>
  );
}
