import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'memory');

export default function PtBrGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="pt-br">
      <MemoryGame lang="pt-br" />
    </GameShellIntl>
  );
}
