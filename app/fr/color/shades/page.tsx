import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Générateur de nuances — Échelle 50 à 900 depuis une couleur',
  description: 'Donnez une couleur de marque et dix paliers sont construits, plus clairs (teintes) et plus sombres (ombres). La sortie arrive sous la forme 50 · 100 · … · 900 qu’attendent Tailwind et la plupart des design systems.',
  alternates: {
    canonical: '/fr/color/shades',
    languages: alternateLanguages('/color/shades'),
  },
};

export default function FrColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="fr">
      <ShadesTool lang="fr" />
    </ColorShellIntl>
  );
}
