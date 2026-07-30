import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Generador de box-shadow CSS — Vista previa y código',
  description: 'Ajusta desplazamiento, desenfoque, extensión, color y opacidad viendo el resultado, y llévate el CSS. Incluye ajustes que superponen varias sombras para una sensación de profundidad más natural.',
  alternates: {
    canonical: '/es/color/shadow',
    languages: alternateLanguages('/color/shadow'),
  },
};

export default function EsColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="es">
      <ShadowTool lang="es" />
    </ColorShellIntl>
  );
}
