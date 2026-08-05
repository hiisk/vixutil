import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'shadow');

export default function DeColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="de">
      <ShadowTool lang="de" />
    </ColorShellIntl>
  );
}
