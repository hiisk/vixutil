import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Farbabstufungen — Skala 50 bis 900 aus einer Farbe',
  description: 'Gib eine Markenfarbe an, und es entstehen zehn Stufen, heller (Tints) und dunkler (Shades). Die Ausgabe kommt in der Form 50 · 100 · … · 900, die Tailwind und die meisten Designsysteme erwarten.',
  alternates: {
    canonical: '/de/color/shades',
    languages: alternateLanguages('/color/shades'),
  },
};

export default function DeColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="de">
      <ShadesTool lang="de" />
    </ColorShellIntl>
  );
}
