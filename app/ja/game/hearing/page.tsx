import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'hearing');

export default function JaGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="ja">
      <HearingGame lang="ja" />
    </GameShellIntl>
  );
}
