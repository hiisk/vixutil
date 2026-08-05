import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'palette');

export default function JaColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="ja">
      <PaletteTool lang="ja" />
    </ColorShellIntl>
  );
}
