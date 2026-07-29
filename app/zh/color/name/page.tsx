import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';

export const metadata: Metadata = {
  title: '颜色名称查询 — 与 HEX 最接近的颜色名',
  description: '输入色值，它会找出最接近的有名颜色（珊瑚色、青绿、绯红等），并同时给出 HEX、RGB、HSL 与 CMYK。适合需要用语言描述颜色的时候。',
  alternates: {
    canonical: '/zh/color/name',
    languages: { 'en': '/en/color/name', 'zh': '/zh/color/name', 'ko': '/color/name', 'x-default': '/en/color/name' },
  },
};

export default function ZhNamePage() {
  return (
    <ColorShellIntl slug="name" lang="zh">
      <NameTool lang="zh" />
    </ColorShellIntl>
  );
}
