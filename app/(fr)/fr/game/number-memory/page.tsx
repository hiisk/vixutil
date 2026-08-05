import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'number-memory');

export default function FrGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="fr">
      <NumberMemoryGame lang="fr" />
    </GameShellIntl>
  );
}
