import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hant', 'mixer');

export default function EnColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="zh-hant">
      <MixerTool lang="zh-hant" />
    </ColorShellIntl>
  );
}
