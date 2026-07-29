import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MemoryGame from '@/components/game/MemoryGame';

export const metadata: Metadata = {
  title: '顺序记忆游戏 — 用颜色顺序测短期记忆',
  description: '彩色按钮会一个一个亮起，你要记住顺序并照样按回去。每答对一次顺序就长一位，所以走到第几关就是短期记忆的分数。',
  alternates: {
    canonical: '/zh/game/memory',
    languages: { 'en': '/en/game/memory', 'zh': '/zh/game/memory', 'ko': '/game/memory', 'x-default': '/en/game/memory' },
  },
};

export default function ZhGameMemoryPage() {
  return (
    <GameShellIntl slug="memory" lang="zh">
      <MemoryGame lang="zh" />
    </GameShellIntl>
  );
}
