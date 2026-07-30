import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Farbtemperatur umrechnen — Kelvin zu RGB',
  description: 'Sieh, wie Warmweiß mit 2700 K wirklich aussieht und wie blau Tageslicht mit 6500 K tatsächlich ist. Nützlich bei der Wahl von Leuchtmitteln oder um ein Gefühl für den Weißabgleich in der Fotografie zu bekommen.',
  alternates: {
    canonical: '/de/color/temperature',
    languages: alternateLanguages('/color/temperature'),
  },
};

export default function DeColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="de">
      <TemperatureTool lang="de" />
    </ColorShellIntl>
  );
}
