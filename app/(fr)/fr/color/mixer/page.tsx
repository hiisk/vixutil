import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'mixer');

export default function FrColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="fr">
      <MixerTool lang="fr" />
    </ColorShellIntl>
  );
}
