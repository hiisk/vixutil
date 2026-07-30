import type { Metadata } from 'next';
import ColorHubIntl from '@/components/ColorHubIntl';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Herramientas de color — Paletas, contraste, degradados CSS',
  description: 'Herramientas de color gratis: generador de paletas, escala de tonos, comprobador de contraste, simulador de daltonismo, degradados y sombras CSS. Funciona en el navegador, sin instalar nada.',
  alternates: {
    canonical: '/es/color',
    languages: alternateLanguages('/color'),
  },
};

export default function EsColorHub() {
  return <ColorHubIntl lang="es" />;
}
