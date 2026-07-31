import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'number-memory');

export default function ZhHantGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="zh-hant">
      <NumberMemoryGame lang="zh-hant" />
    </GameShellIntl>
  );
}
