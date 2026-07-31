import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'number-memory');

export default function ZhHansGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="zh-hans">
      <NumberMemoryGame lang="zh-hans" />
    </GameShellIntl>
  );
}
