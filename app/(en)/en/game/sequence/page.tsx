import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('en', 'sequence');

export default function EnGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="en">
      <SequenceGame lang="en" />
    </GameShellIntl>
  );
}
