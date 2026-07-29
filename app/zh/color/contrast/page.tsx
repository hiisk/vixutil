import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';

export const metadata: Metadata = {
  title: '颜色对比度检查 — WCAG AA／AAA 比值',
  description: '计算背景色与文字色的对比度比值，并判断是否达到无障碍标准（WCAG AA 与 AAA），同时提供真实文字预览，可以用眼睛再确认一次。',
  alternates: {
    canonical: '/zh/color/contrast',
    languages: { 'en': '/en/color/contrast', 'zh': '/zh/color/contrast', 'ko': '/color/contrast', 'x-default': '/en/color/contrast' },
  },
};

export default function ZhContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="zh">
      <ContrastTool lang="zh" />
    </ColorShellIntl>
  );
}
