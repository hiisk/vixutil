import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('de', 'sequence');

export default function DeGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="de">
      <SequenceGame lang="de" />
    </GameShellIntl>
  );
}
