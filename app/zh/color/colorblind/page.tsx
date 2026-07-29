import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';

export const metadata: Metadata = {
  title: '色盲模拟器 — 预览红绿蓝色盲所见',
  description: '把你的颜色转换成红色盲、绿色盲、蓝色盲与全色盲所看到的样子。为什么「只靠红绿区分状态」的界面有问题，一看就明白。',
  alternates: {
    canonical: '/zh/color/colorblind',
    languages: { 'en': '/en/color/colorblind', 'zh': '/zh/color/colorblind', 'ko': '/color/colorblind', 'x-default': '/en/color/colorblind' },
  },
};

export default function ZhColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="zh">
      <ColorblindTool lang="zh" />
    </ColorShellIntl>
  );
}
