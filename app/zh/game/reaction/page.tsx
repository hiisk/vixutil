import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ReactionGame from '@/components/game/ReactionGame';

export const metadata: Metadata = {
  title: '反应速度测试 — 以毫秒测你的反应时间',
  description: '屏幕变绿的那一刻就点下去。测五次，给出平均值和最快成绩（毫秒），并和人的平均反应速度作对比。',
  alternates: {
    canonical: '/zh/game/reaction',
    languages: { 'en': '/en/game/reaction', 'zh': '/zh/game/reaction', 'ko': '/game/reaction', 'x-default': '/en/game/reaction' },
  },
};

export default function ZhGameReactionPage() {
  return (
    <GameShellIntl slug="reaction" lang="zh">
      <ReactionGame lang="zh" />
    </GameShellIntl>
  );
}
