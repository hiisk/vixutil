import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Generador de tonos — Escala 50 a 900 desde un solo color',
  description: 'Dale un color de marca y construye diez pasos, más claros (tintes) y más oscuros (sombras). La salida viene en la forma 50 · 100 · … · 900 que esperan Tailwind y la mayoría de sistemas de diseño.',
  alternates: {
    canonical: '/es/color/shades',
    languages: alternateLanguages('/color/shades'),
  },
};

export default function EsColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="es">
      <ShadesTool lang="es" />
    </ColorShellIntl>
  );
}
