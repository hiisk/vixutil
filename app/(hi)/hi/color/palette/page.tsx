import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'palette');

export default function HiColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="hi">
      <PaletteTool lang="hi" />
    </ColorShellIntl>
  );
}
