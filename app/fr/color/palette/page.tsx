import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'palette');

export default function FrColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="fr">
      <PaletteTool lang="fr" />
    </ColorShellIntl>
  );
}
