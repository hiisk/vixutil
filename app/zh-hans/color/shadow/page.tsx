import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hans', 'shadow');

export default function EnColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="zh-hans">
      <ShadowTool lang="zh-hans" />
    </ColorShellIntl>
  );
}
