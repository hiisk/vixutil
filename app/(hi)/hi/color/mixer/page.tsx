import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'mixer');

export default function HiColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="hi">
      <MixerTool lang="hi" />
    </ColorShellIntl>
  );
}
