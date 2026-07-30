import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'cps');

export default function EnGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="en">
      <CpsGame lang="en" />
    </GameShellIntl>
  );
}
