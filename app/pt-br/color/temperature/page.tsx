import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'temperature');

export default function PtBrColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="pt-br">
      <TemperatureTool lang="pt-br" />
    </ColorShellIntl>
  );
}
