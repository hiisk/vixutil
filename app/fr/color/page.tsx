import type { Metadata } from 'next';
import ColorHubIntl from '@/components/ColorHubIntl';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Outils de couleur — Palettes, contraste, dégradés CSS',
  description: 'Outils de couleur gratuits : générateur de palettes, échelle de nuances, vérificateur de contraste, simulateur de daltonisme, dégradé et ombre CSS. Tourne dans le navigateur, rien à installer.',
  alternates: {
    canonical: '/fr/color',
    languages: alternateLanguages('/color'),
  },
};

export default function FrColorHub() {
  return <ColorHubIntl lang="fr" />;
}
