import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import RotationGame from '@/components/game/RotationGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'rotation');

export default function ZhHantGameRotationPage() {
  return (
    <GameShellIntl slug="rotation" lang="zh-hant">
      <RotationGame lang="zh-hant" />
    </GameShellIntl>
  );
}
