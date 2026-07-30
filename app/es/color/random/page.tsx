import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Generador de colores aleatorios — Vuelve a tirar con bloqueos',
  description: 'Genera cinco colores al azar. Bloquea los que te gusten y vuelve a tirar solo el resto, para recorrer combinaciones rápido hasta que alguna funcione.',
  alternates: {
    canonical: '/es/color/random',
    languages: alternateLanguages('/color/random'),
  },
};

export default function EsColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="es">
      <RandomTool lang="es" />
    </ColorShellIntl>
  );
}
