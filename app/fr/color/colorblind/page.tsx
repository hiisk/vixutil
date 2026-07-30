import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Simulateur de daltonisme — Protanopie, deutéranopie et plus',
  description: 'Convertit vos couleurs pour montrer comment les voit une personne atteinte de protanopie, deutéranopie, tritanopie ou d’achromatopsie. On comprend immédiatement pourquoi une interface qui distingue des états uniquement par le rouge et le vert pose problème.',
  alternates: {
    canonical: '/fr/color/colorblind',
    languages: alternateLanguages('/color/colorblind'),
  },
};

export default function FrColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="fr">
      <ColorblindTool lang="fr" />
    </ColorShellIntl>
  );
}
