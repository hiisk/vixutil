import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('fr', 'sequence');

export default function FrGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="fr">
      <SequenceGame lang="fr" />
    </GameShellIntl>
  );
}
