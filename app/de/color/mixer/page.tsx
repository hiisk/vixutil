import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Farbmischer — Zwei Farben mischen und die Mitte finden',
  description: 'Setze zwei Farben und verschiebe das Verhältnis, um zu sehen, was dazwischen liegt. Nützlich, um die Farbe an einer bestimmten Stelle eines Verlaufs zu greifen oder einen Mittelton zwischen zwei Markenfarben zu finden.',
  alternates: {
    canonical: '/de/color/mixer',
    languages: alternateLanguages('/color/mixer'),
  },
};

export default function DeColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="de">
      <MixerTool lang="de" />
    </ColorShellIntl>
  );
}
