import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';

export const metadata: Metadata = {
  title: '配色生成器 — 生成协调的配色方案',
  description: '选一个颜色，它就按色轮规则（互补色、类似色、三角配色）取出相配的颜色。按规则挑而不是靠感觉挑，配色不容易出大错。',
  alternates: {
    canonical: '/zh/color/palette',
    languages: { 'en': '/en/color/palette', 'zh': '/zh/color/palette', 'ko': '/color/palette', 'x-default': '/en/color/palette' },
  },
};

export default function ZhPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="zh">
      <PaletteTool lang="zh" />
    </ColorShellIntl>
  );
}
