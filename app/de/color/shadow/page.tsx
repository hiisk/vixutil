import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'CSS-Box-Shadow-Generator — Live-Vorschau und Code',
  description: 'Stelle Versatz, Weichzeichnung, Ausbreitung, Farbe und Deckkraft ein, während du das Ergebnis siehst, und nimm das CSS mit. Enthält Vorlagen, die mehrere Schatten überlagern, für ein natürlicheres Tiefengefühl.',
  alternates: {
    canonical: '/de/color/shadow',
    languages: alternateLanguages('/color/shadow'),
  },
};

export default function DeColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="de">
      <ShadowTool lang="de" />
    </ColorShellIntl>
  );
}
