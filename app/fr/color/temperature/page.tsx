import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'temperature');

export default function FrColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="fr">
      <TemperatureTool lang="fr" />
    </ColorShellIntl>
  );
}
