import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'gradient');

export default function DeColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="de">
      <GradientTool lang="de" />
    </ColorShellIntl>
  );
}
