import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'hearing');

export default function EnGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="en">
      <HearingGame lang="en" />
    </GameShellIntl>
  );
}
