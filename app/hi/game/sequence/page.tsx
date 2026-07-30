import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('hi', 'sequence');

export default function HiGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="hi">
      <SequenceGame lang="hi" />
    </GameShellIntl>
  );
}
