import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'shadow');

export default function JaColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="ja">
      <ShadowTool lang="ja" />
    </ColorShellIntl>
  );
}
