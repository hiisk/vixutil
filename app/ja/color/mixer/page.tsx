import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'mixer');

export default function JaColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="ja">
      <MixerTool lang="ja" />
    </ColorShellIntl>
  );
}
