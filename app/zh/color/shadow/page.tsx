import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';

export const metadata: Metadata = {
  title: 'CSS box-shadow 生成器 — 实时预览与代码',
  description: '一边调偏移、模糊、扩散、颜色与透明度，一边看效果，然后把 CSS 拿走。还内置了叠加多层阴影、做出更自然层次的预设。',
  alternates: {
    canonical: '/zh/color/shadow',
    languages: { 'en': '/en/color/shadow', 'zh': '/zh/color/shadow', 'ko': '/color/shadow', 'x-default': '/en/color/shadow' },
  },
};

export default function ZhShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="zh">
      <ShadowTool lang="zh" />
    </ColorShellIntl>
  );
}
