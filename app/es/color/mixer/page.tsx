import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Mezclador de colores — Combina dos colores y halla el punto medio',
  description: 'Fija dos colores y mueve la proporción para obtener lo que hay entre ellos. Útil para sacar el color de un punto concreto de un degradado, o para hallar un tono intermedio entre dos colores de marca.',
  alternates: {
    canonical: '/es/color/mixer',
    languages: alternateLanguages('/color/mixer'),
  },
};

export default function EsColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="es">
      <MixerTool lang="es" />
    </ColorShellIntl>
  );
}
