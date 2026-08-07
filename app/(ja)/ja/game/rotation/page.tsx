import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'rotation');

export default function JaGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="ja">
      <RotationGame lang="ja" />
    </GameShellIntl>
  );
}
