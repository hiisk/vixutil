import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'rotation');

export default function ZhHansGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="zh-hans">
      <RotationGame lang="zh-hans" />
    </GameShellIntl>
  );
}
