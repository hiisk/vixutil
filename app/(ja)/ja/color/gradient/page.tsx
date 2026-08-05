import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'gradient');

export default function JaColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="ja">
      <GradientTool lang="ja" />
    </ColorShellIntl>
  );
}
