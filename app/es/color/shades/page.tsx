import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'shades');

export default function EsColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="es">
      <ShadesTool lang="es" />
    </ColorShellIntl>
  );
}
