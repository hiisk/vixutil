import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Couleurs aléatoires — Relancer une palette avec verrous',
  description: 'Génère cinq couleurs au hasard. Verrouillez celles qui vous plaisent et ne relancez que le reste, pour parcourir vite les combinaisons jusqu’à ce qu’une tienne.',
  alternates: {
    canonical: '/fr/color/random',
    languages: alternateLanguages('/color/random'),
  },
};

export default function FrColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="fr">
      <RandomTool lang="fr" />
    </ColorShellIntl>
  );
}
