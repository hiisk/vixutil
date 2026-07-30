import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Farbpaletten-Generator — Stimmige Farbschemata bauen',
  description: 'Wähle eine Farbe, und die passenden werden nach den Regeln des Farbkreises abgeleitet: Komplementär, analog, Triade. Nach Regel statt nach Gefühl zu wählen verhindert, dass ein Schema deutlich danebengeht.',
  alternates: {
    canonical: '/de/color/palette',
    languages: alternateLanguages('/color/palette'),
  },
};

export default function DeColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="de">
      <PaletteTool lang="de" />
    </ColorShellIntl>
  );
}
