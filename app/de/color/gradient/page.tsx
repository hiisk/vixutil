import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'CSS-Gradient-Generator — linear-gradient Code',
  description: 'Setze Farben und Winkel, und der CSS-linear-gradient wird für dich geschrieben. Verschiebe die Farbstopps, um zu bestimmen, wo der Übergang passiert, und füge das Ergebnis direkt ein.',
  alternates: {
    canonical: '/de/color/gradient',
    languages: alternateLanguages('/color/gradient'),
  },
};

export default function DeColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="de">
      <GradientTool lang="de" />
    </ColorShellIntl>
  );
}
