import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Nombre de color — El color con nombre más cercano a un HEX',
  description: 'Introduce un código de color y encuentra el color con nombre más cercano —coral, verde azulado, carmesí— y muestra HEX, RGB, HSL y CMYK juntos. Para cuando hay que describir un color con palabras.',
  alternates: {
    canonical: '/es/color/name',
    languages: alternateLanguages('/color/name'),
  },
};

export default function EsColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="es">
      <NameTool lang="es" />
    </ColorShellIntl>
  );
}
