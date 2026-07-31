import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'hearing');

export default function ZhHantGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="zh-hant">
      <HearingGame lang="zh-hant" />
    </GameShellIntl>
  );
}
