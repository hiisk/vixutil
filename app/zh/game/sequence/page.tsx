import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import SequenceGame from '@/components/game/SequenceGame';

export const metadata: Metadata = {
  title: '图案记忆游戏 — 测视觉空间记忆',
  description: '格子里会有几格短暂亮起后熄灭。记住是哪几格并点它们。关数越高亮起的格子越多，格子本身也会变大。',
  alternates: {
    canonical: '/zh/game/sequence',
    languages: { 'en': '/en/game/sequence', 'zh': '/zh/game/sequence', 'ko': '/game/sequence', 'x-default': '/en/game/sequence' },
  },
};

export default function ZhGameSequencePage() {
  return (
    <GameShellIntl slug="sequence" lang="zh">
      <SequenceGame lang="zh" />
    </GameShellIntl>
  );
}
