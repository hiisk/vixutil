import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Générateur de palettes — Construire des harmonies qui tiennent',
  description: 'Choisissez une couleur et les couleurs qui vont avec sont déduites selon les règles du cercle chromatique : complémentaires, analogues, triade. Choisir par règle plutôt qu’à l’œil évite qu’une harmonie parte franchement de travers.',
  alternates: {
    canonical: '/fr/color/palette',
    languages: alternateLanguages('/color/palette'),
  },
};

export default function FrColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="fr">
      <PaletteTool lang="fr" />
    </ColorShellIntl>
  );
}
