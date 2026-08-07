import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'beat');

export default function ZhHansGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="zh-hans">
      <BeatGame lang="zh-hans" />
    </GameShellIntl>
  );
}
