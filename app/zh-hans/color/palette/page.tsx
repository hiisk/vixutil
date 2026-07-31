import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hans', 'palette');

export default function EnColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="zh-hans">
      <PaletteTool lang="zh-hans" />
    </ColorShellIntl>
  );
}
