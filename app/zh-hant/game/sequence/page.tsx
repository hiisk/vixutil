import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';
import { gameMetaIntl } from '@/lib/game-tools-intl';

export const metadata: Metadata = gameMetaIntl('zh-hant', 'sequence');

export default function ZhHantGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="zh-hant">
      <SequenceGame lang="zh-hant" />
    </GameShellIntl>
  );
}
