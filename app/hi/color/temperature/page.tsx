import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'temperature');

export default function HiColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="hi">
      <TemperatureTool lang="hi" />
    </ColorShellIntl>
  );
}
