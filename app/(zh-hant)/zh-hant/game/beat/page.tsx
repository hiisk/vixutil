import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import BeatGame from '@/components/game/BeatGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'beat');

export default function ZhHantGameBeatPage() {
  return (
    <GameShellIntl slug="beat" lang="zh-hant">
      <BeatGame lang="zh-hant" />
    </GameShellIntl>
  );
}
