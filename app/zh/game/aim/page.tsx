import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import AimGame from '@/components/game/AimGame';

export const metadata: Metadata = {
  title: '瞄准点击游戏 — 鼠标精度与瞄准练习',
  description: '在限定时间内尽可能多地击中随机位置出现的靶子。它也会统计打空的点击并算出命中率，所以还能当鼠标操作练习用。',
  alternates: {
    canonical: '/zh/game/aim',
    languages: { 'en': '/en/game/aim', 'zh': '/zh/game/aim', 'ko': '/game/aim', 'x-default': '/en/game/aim' },
  },
};

export default function ZhGameAimPage() {
  return (
    <GameShellIntl slug="aim" lang="zh">
      <AimGame lang="zh" />
    </GameShellIntl>
  );
}
