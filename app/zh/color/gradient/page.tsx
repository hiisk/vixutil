import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';

export const metadata: Metadata = {
  title: 'CSS 渐变生成器 — linear-gradient 代码',
  description: '设好颜色与角度，它就写出 CSS linear-gradient。可以移动色标位置控制在哪里过渡，结果可以直接粘贴使用。',
  alternates: {
    canonical: '/zh/color/gradient',
    languages: { 'en': '/en/color/gradient', 'zh': '/zh/color/gradient', 'ko': '/color/gradient', 'x-default': '/en/color/gradient' },
  },
};

export default function ZhGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="zh">
      <GradientTool lang="zh" />
    </ColorShellIntl>
  );
}
