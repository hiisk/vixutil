import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'contrast');

export default function EsColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="es">
      <ContrastTool lang="es" />
    </ColorShellIntl>
  );
}
