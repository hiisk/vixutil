import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'temperature');

export default function DeColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="de">
      <TemperatureTool lang="de" />
    </ColorShellIntl>
  );
}
