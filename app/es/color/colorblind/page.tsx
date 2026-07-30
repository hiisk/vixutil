import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Simulador de daltonismo — Protanopía, deuteranopía y más',
  description: 'Convierte tus colores para mostrar cómo los ve alguien con protanopía, deuteranopía, tritanopía o acromatopsia. Deja claro al instante por qué una pantalla que distingue estados solo con rojo y verde es un problema.',
  alternates: {
    canonical: '/es/color/colorblind',
    languages: alternateLanguages('/color/colorblind'),
  },
};

export default function EsColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="es">
      <ColorblindTool lang="es" />
    </ColorShellIntl>
  );
}
