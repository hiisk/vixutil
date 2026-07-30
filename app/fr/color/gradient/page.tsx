import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'gradient');

export default function FrColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="fr">
      <GradientTool lang="fr" />
    </ColorShellIntl>
  );
}
