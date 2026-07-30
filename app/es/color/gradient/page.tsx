import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'gradient');

export default function EsColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="es">
      <GradientTool lang="es" />
    </ColorShellIntl>
  );
}
