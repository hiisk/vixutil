import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'mixer');

export default function EsColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="es">
      <MixerTool lang="es" />
    </ColorShellIntl>
  );
}
