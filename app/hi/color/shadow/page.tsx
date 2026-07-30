import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'shadow');

export default function HiColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="hi">
      <ShadowTool lang="hi" />
    </ColorShellIntl>
  );
}
