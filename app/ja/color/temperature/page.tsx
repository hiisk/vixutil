import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'temperature');

export default function JaColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="ja">
      <TemperatureTool lang="ja" />
    </ColorShellIntl>
  );
}
