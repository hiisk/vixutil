import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'gradient');

export default function PtBrColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="pt-br">
      <GradientTool lang="pt-br" />
    </ColorShellIntl>
  );
}
