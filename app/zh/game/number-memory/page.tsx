import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import NumberMemoryGame from '@/components/game/NumberMemoryGame';

export const metadata: Metadata = {
  title: '数字记忆测试 — 你能记住几位数',
  description: '数字短暂出现后消失，你把它输入回去。答对就多一位。人一次能记住的数字通常在七位左右，所以大多在那附近开始撑不住。',
  alternates: {
    canonical: '/zh/game/number-memory',
    languages: { 'en': '/en/game/number-memory', 'zh': '/zh/game/number-memory', 'ko': '/game/number-memory', 'x-default': '/en/game/number-memory' },
  },
};

export default function ZhGameNumberMemoryPage() {
  return (
    <GameShellIntl slug="number-memory" lang="zh">
      <NumberMemoryGame lang="zh" />
    </GameShellIntl>
  );
}
