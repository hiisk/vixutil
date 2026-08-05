import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'hearing');

export default function ZhHansGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="zh-hans">
      <HearingGame lang="zh-hans" />
    </GameShellIntl>
  );
}
