import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import CpsGame from '@/components/game/CpsGame';

export const metadata: Metadata = {
  title: '点击速度测试 — 测每秒点击次数（CPS）',
  description: '在规定时间内尽可能快地点击，测出每秒点击次数（CPS）。可以选 5 秒、10 秒或 30 秒；手机上用触摸也是同样的测法。',
  alternates: {
    canonical: '/zh/game/cps',
    languages: { 'en': '/en/game/cps', 'zh': '/zh/game/cps', 'ko': '/game/cps', 'x-default': '/en/game/cps' },
  },
};

export default function ZhGameCpsPage() {
  return (
    <GameShellIntl slug="cps" lang="zh">
      <CpsGame lang="zh" />
    </GameShellIntl>
  );
}
