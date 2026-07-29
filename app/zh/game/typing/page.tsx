import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import TypingGame from '@/components/game/TypingGame';

export const metadata: Metadata = {
  title: '打字速度测试 — 免费测每分钟字数与正确率',
  description: '照着给出的句子输入，测每分钟字数和正确率。打错的字会立刻标出来，句子每轮都会变，所以没法靠背下来蒙过去。',
  alternates: {
    canonical: '/zh/game/typing',
    languages: { 'en': '/en/game/typing', 'zh': '/zh/game/typing', 'ko': '/game/typing', 'x-default': '/en/game/typing' },
  },
};

export default function ZhGameTypingPage() {
  return (
    <GameShellIntl slug="typing" lang="zh">
      <TypingGame lang="zh" />
    </GameShellIntl>
  );
}
