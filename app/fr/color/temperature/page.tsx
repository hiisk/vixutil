import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import TemperatureTool from '@/components/color/TemperatureTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Température de couleur — Convertir des kelvins en RGB',
  description: 'Voyez à quoi ressemble vraiment le blanc chaud à 2700 K, et à quel point la lumière du jour à 6500 K est bleue. Utile pour choisir un éclairage ou se faire une idée de la balance des blancs en photo.',
  alternates: {
    canonical: '/fr/color/temperature',
    languages: alternateLanguages('/color/temperature'),
  },
};

export default function FrColorTemperaturePage() {
  return (
    <ColorShellIntl slug="temperature" lang="fr">
      <TemperatureTool lang="fr" />
    </ColorShellIntl>
  );
}
