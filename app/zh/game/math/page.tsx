import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import MathGame from '@/components/game/MathGame';

export const metadata: Metadata = {
  title: '心算挑战 — 30 秒四则运算',
  description: '在限定时间内尽可能多地做四则运算题。可以选运算种类和难度，结束后给出做对的题数、正确率和每题平均用时。',
  alternates: {
    canonical: '/zh/game/math',
    languages: { 'en': '/en/game/math', 'zh': '/zh/game/math', 'ko': '/game/math', 'x-default': '/en/game/math' },
  },
};

export default function ZhGameMathPage() {
  return (
    <GameShellIntl slug="math" lang="zh">
      <MathGame lang="zh" />
    </GameShellIntl>
  );
}
