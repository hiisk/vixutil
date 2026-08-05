import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'hearing');

export default function DeGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="de">
      <HearingGame lang="de" />
    </GameShellIntl>
  );
}
