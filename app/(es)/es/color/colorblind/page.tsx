import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'colorblind');

export default function EsColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="es">
      <ColorblindTool lang="es" />
    </ColorShellIntl>
  );
}
