import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hans', 'gradient');

export default function EnColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="zh-hans">
      <GradientTool lang="zh-hans" />
    </ColorShellIntl>
  );
}
