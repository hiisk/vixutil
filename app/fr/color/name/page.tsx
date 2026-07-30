import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Nom de couleur — La couleur nommée la plus proche d’un HEX',
  description: 'Saisissez un code couleur et la couleur nommée la plus proche est trouvée — corail, sarcelle, cramoisi — avec HEX, RGB, HSL et CMJN ensemble. Pour quand il faut décrire une couleur avec des mots.',
  alternates: {
    canonical: '/fr/color/name',
    languages: alternateLanguages('/color/name'),
  },
};

export default function FrColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="fr">
      <NameTool lang="fr" />
    </ColorShellIntl>
  );
}
