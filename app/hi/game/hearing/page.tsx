import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import HearingGame from '@/components/game/HearingGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'hearing');

export default function HiGameHearingPage() {
  return (
    <GameShellIntl slug="hearing" lang="hi">
      <HearingGame lang="hi" />
    </GameShellIntl>
  );
}
