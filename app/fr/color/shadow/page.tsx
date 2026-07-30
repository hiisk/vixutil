import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'shadow');

export default function FrColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="fr">
      <ShadowTool lang="fr" />
    </ColorShellIntl>
  );
}
