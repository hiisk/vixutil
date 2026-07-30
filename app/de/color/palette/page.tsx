import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'palette');

export default function DeColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="de">
      <PaletteTool lang="de" />
    </ColorShellIntl>
  );
}
