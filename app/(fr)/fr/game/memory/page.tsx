import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'memory');

export default function FrGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="fr">
      <MemoryGame lang="fr" />
    </GameShellIntl>
  );
}
