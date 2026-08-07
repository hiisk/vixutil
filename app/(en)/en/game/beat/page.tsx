import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'beat');

export default function EnGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="en">
      <BeatGame lang="en" />
    </GameShellIntl>
  );
}
