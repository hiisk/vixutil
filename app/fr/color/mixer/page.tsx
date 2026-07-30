import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Mélangeur de couleurs — Mélanger deux couleurs et trouver le milieu',
  description: 'Fixez deux couleurs et déplacez la proportion pour obtenir ce qui se trouve entre elles. Utile pour récupérer la couleur à un point précis d’un dégradé, ou trouver un ton intermédiaire entre deux couleurs de marque.',
  alternates: {
    canonical: '/fr/color/mixer',
    languages: alternateLanguages('/color/mixer'),
  },
};

export default function FrColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="fr">
      <MixerTool lang="fr" />
    </ColorShellIntl>
  );
}
