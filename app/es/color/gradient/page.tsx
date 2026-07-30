import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Generador de degradados CSS — Código linear-gradient',
  description: 'Fija los colores y el ángulo y te escribe el linear-gradient de CSS. Mueve las paradas de color para controlar dónde ocurre la transición y pega el resultado directamente.',
  alternates: {
    canonical: '/es/color/gradient',
    languages: alternateLanguages('/color/gradient'),
  },
};

export default function EsColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="es">
      <GradientTool lang="es" />
    </ColorShellIntl>
  );
}
