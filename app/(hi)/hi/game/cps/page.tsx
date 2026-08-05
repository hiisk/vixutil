import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'cps');

export default function HiGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="hi">
      <CpsGame lang="hi" />
    </GameShellIntl>
  );
}
