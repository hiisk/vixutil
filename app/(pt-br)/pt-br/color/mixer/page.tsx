import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'mixer');

export default function PtBrColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="pt-br">
      <MixerTool lang="pt-br" />
    </ColorShellIntl>
  );
}
