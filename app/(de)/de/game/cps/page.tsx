import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'cps');

export default function DeGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="de">
      <CpsGame lang="de" />
    </GameShellIntl>
  );
}
