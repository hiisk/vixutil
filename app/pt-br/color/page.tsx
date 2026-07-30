import type { Metadata } from 'next';
import ColorHubIntl from '@/components/ColorHubIntl';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Ferramentas de cor — Paletas, contraste, gradiente CSS',
  description: 'Ferramentas de cor grátis: gerador de paletas, escala de tons, verificador de contraste, simulador de daltonismo, gradiente e sombra CSS. Roda no navegador, sem instalar nada.',
  alternates: {
    canonical: '/pt-br/color',
    languages: alternateLanguages('/color'),
  },
};

export default function PtBrColorHub() {
  return <ColorHubIntl lang="pt-br" />;
}
