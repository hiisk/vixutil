import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Générateur de dégradé CSS — Code linear-gradient',
  description: 'Fixez les couleurs et l’angle et le linear-gradient CSS est écrit pour vous. Déplacez les arrêts de couleur pour choisir où se produit la transition, puis collez le résultat tel quel.',
  alternates: {
    canonical: '/fr/color/gradient',
    languages: alternateLanguages('/color/gradient'),
  },
};

export default function FrColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="fr">
      <GradientTool lang="fr" />
    </ColorShellIntl>
  );
}
