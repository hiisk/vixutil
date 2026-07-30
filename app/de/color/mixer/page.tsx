import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'mixer');

export default function DeColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="de">
      <MixerTool lang="de" />
    </ColorShellIntl>
  );
}
