import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'aim');

export default function JaGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="ja">
      <AimGame lang="ja" />
    </GameShellIntl>
  );
}
