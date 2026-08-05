import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'palette');

export default function PtBrColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="pt-br">
      <PaletteTool lang="pt-br" />
    </ColorShellIntl>
  );
}
