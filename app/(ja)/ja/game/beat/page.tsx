import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'beat');

export default function JaGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="ja">
      <BeatGame lang="ja" />
    </GameShellIntl>
  );
}
