import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('en', 'shadow');

export default function EnColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="en">
      <ShadowTool lang="en" />
    </ColorShellIntl>
  );
}
