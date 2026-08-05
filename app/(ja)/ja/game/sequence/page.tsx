import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('ja', 'sequence');

export default function JaGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="ja">
      <SequenceGame lang="ja" />
    </GameShellIntl>
  );
}
