import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';

export const metadata: Metadata = {
  title: '随机配色生成器 — 可锁定的配色重抽',
  description: '一次生成五个随机颜色。喜欢的可以上锁，只重抽其余的，这样能快速换到满意的组合。',
  alternates: {
    canonical: '/zh/color/random',
    languages: { 'en': '/en/color/random', 'zh': '/zh/color/random', 'ko': '/color/random', 'x-default': '/en/color/random' },
  },
};

export default function ZhRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="zh">
      <RandomTool lang="zh" />
    </ColorShellIntl>
  );
}
