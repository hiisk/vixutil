import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';

export const metadata: Metadata = {
  title: '色阶生成器 — 一个颜色生成 50~900 色板',
  description: '输入一个品牌色，它会往亮（tint）和暗（shade）两个方向生成十个阶。输出就是 Tailwind 与多数设计系统在用的 50·100·…·900 形式。',
  alternates: {
    canonical: '/zh/color/shades',
    languages: { 'en': '/en/color/shades', 'zh': '/zh/color/shades', 'ko': '/color/shades', 'x-default': '/en/color/shades' },
  },
};

export default function ZhShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="zh">
      <ShadesTool lang="zh" />
    </ColorShellIntl>
  );
}
