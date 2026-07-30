import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Comprobador de contraste de color — Ratio WCAG AA y AAA',
  description: 'Calcula la relación de contraste entre el fondo y el texto y te dice si supera los umbrales de accesibilidad web (WCAG AA y AAA), con una vista previa real para juzgarlo también a ojo.',
  alternates: {
    canonical: '/es/color/contrast',
    languages: alternateLanguages('/color/contrast'),
  },
};

export default function EsColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="es">
      <ContrastTool lang="es" />
    </ColorShellIntl>
  );
}
