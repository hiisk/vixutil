import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'beat');

export default function DeGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="de">
      <BeatGame lang="de" />
    </GameShellIntl>
  );
}
