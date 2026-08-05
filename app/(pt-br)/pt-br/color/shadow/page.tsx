import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'shadow');

export default function PtBrColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="pt-br">
      <ShadowTool lang="pt-br" />
    </ColorShellIntl>
  );
}
