import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'shadow');

export default function EsColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="es">
      <ShadowTool lang="es" />
    </ColorShellIntl>
  );
}
