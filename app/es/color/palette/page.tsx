import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Generador de paletas de colores — Crea combinaciones que funcionan',
  description: 'Elige un color y deduce los que combinan con él según las reglas del círculo cromático: complementarios, análogos, tríada. Elegir por regla en vez de a ojo evita que una combinación se vaya de las manos.',
  alternates: {
    canonical: '/es/color/palette',
    languages: alternateLanguages('/color/palette'),
  },
};

export default function EsColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="es">
      <PaletteTool lang="es" />
    </ColorShellIntl>
  );
}
