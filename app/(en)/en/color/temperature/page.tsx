import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('en', 'temperature');

export default function EnColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="en">
      <TemperatureTool lang="en" />
    </ColorShellIntl>
  );
}
