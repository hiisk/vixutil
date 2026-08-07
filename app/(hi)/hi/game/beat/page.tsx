import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'beat');

export default function HiGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="hi">
      <BeatGame lang="hi" />
    </GameShellIntl>
  );
}
