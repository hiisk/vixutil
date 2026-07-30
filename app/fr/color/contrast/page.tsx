import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Contraste des couleurs — Ratio WCAG AA et AAA',
  description: 'Calcule le rapport de contraste entre le fond et le texte et indique s’il franchit les seuils d’accessibilité web (WCAG AA et AAA), avec un aperçu de texte réel pour juger aussi à l’œil.',
  alternates: {
    canonical: '/fr/color/contrast',
    languages: alternateLanguages('/color/contrast'),
  },
};

export default function FrColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="fr">
      <ContrastTool lang="fr" />
    </ColorShellIntl>
  );
}
