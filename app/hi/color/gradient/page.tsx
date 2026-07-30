import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'gradient');

export default function HiColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="hi">
      <GradientTool lang="hi" />
    </ColorShellIntl>
  );
}
