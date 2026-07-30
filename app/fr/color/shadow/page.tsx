import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Générateur de box-shadow CSS — Aperçu et code',
  description: 'Réglez décalage, flou, étalement, couleur et opacité en voyant le résultat, puis récupérez le CSS. Inclut des préréglages qui superposent plusieurs ombres pour une profondeur plus naturelle.',
  alternates: {
    canonical: '/fr/color/shadow',
    languages: alternateLanguages('/color/shadow'),
  },
};

export default function FrColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="fr">
      <ShadowTool lang="fr" />
    </ColorShellIntl>
  );
}
