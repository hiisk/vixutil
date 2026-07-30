import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Gerador de tons — Escala 50 a 900 a partir de uma cor',
  description: 'Dê uma cor de marca e ele monta dez degraus, mais claros (tints) e mais escuros (shades). A saída sai no formato 50 · 100 · … · 900 que o Tailwind e a maioria dos design systems esperam.',
  alternates: {
    canonical: '/pt-br/color/shades',
    languages: alternateLanguages('/color/shades'),
  },
};

export default function PtBrColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="pt-br">
      <ShadesTool lang="pt-br" />
    </ColorShellIntl>
  );
}
