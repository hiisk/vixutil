import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';

export const metadata: Metadata = {
  title: '颜色混合器 — 混合两色并取中间色',
  description: '设定两个颜色并拖动比例，就能得到它们之间的颜色。适合取渐变中某一点的颜色，或找两个品牌色的中间调。',
  alternates: {
    canonical: '/zh/color/mixer',
    languages: { 'en': '/en/color/mixer', 'zh': '/zh/color/mixer', 'ko': '/color/mixer', 'x-default': '/en/color/mixer' },
  },
};

export default function ZhMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="zh">
      <MixerTool lang="zh" />
    </ColorShellIntl>
  );
}
