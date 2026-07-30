import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'random');

export default function EsColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="es">
      <RandomTool lang="es" />
    </ColorShellIntl>
  );
}
