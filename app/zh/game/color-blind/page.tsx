import type { Metadata } from 'next';
import GameShellIntl from '@/components/GameShellIntl';
import ColorBlindGame from '@/components/game/ColorBlindGame';

export const metadata: Metadata = {
  title: '辨色力测试 — 分辨细微的颜色差异',
  description: '一堆同色方块中，恰好有一格颜色不同。关数越高差异越小，直到再也分不出来 —— 那个点就是你的辨色极限。',
  alternates: {
    canonical: '/zh/game/color-blind',
    languages: { 'en': '/en/game/color-blind', 'zh': '/zh/game/color-blind', 'ko': '/game/color-blind', 'x-default': '/en/game/color-blind' },
  },
};

export default function ZhGameColorBlindPage() {
  return (
    <GameShellIntl slug="color-blind" lang="zh">
      <ColorBlindGame lang="zh" />
    </GameShellIntl>
  );
}
