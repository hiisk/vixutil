import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'cps');

export default function JaGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="ja">
      <CpsGame lang="ja" />
    </GameShellIntl>
  );
}
