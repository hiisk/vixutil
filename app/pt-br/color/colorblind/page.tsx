import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Simulador de daltonismo — Protanopia, deuteranopia e mais',
  description: 'Converte suas cores para mostrar como elas aparecem para quem tem protanopia, deuteranopia, tritanopia ou acromatopsia. Fica óbvio na hora por que uma tela que distingue estados só com vermelho e verde é um problema.',
  alternates: {
    canonical: '/pt-br/color/colorblind',
    languages: alternateLanguages('/color/colorblind'),
  },
};

export default function PtBrColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="pt-br">
      <ColorblindTool lang="pt-br" />
    </ColorShellIntl>
  );
}
