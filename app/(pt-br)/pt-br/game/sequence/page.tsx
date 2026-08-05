import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('pt-br', 'sequence');

export default function PtBrGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="pt-br">
      <SequenceGame lang="pt-br" />
    </GameShellIntl>
  );
}
