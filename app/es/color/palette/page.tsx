import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'palette');

export default function EsColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="es">
      <PaletteTool lang="es" />
    </ColorShellIntl>
  );
}
