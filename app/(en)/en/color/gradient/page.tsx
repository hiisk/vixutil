import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('en', 'gradient');

export default function EnColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="en">
      <GradientTool lang="en" />
    </ColorShellIntl>
  );
}
