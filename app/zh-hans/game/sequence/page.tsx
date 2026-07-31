import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hans', 'sequence');

export default function ZhHansGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="zh-hans">
      <SequenceGame lang="zh-hans" />
    </GameShellIntl>
  );
}
