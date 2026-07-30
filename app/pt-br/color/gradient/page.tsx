import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import GradientTool from '@/components/color/GradientTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Gerador de gradiente CSS — Código linear-gradient',
  description: 'Defina as cores e o ângulo e ele escreve o linear-gradient do CSS. Mova as paradas de cor para controlar onde a transição acontece e cole o resultado direto.',
  alternates: {
    canonical: '/pt-br/color/gradient',
    languages: alternateLanguages('/color/gradient'),
  },
};

export default function PtBrColorGradientPage() {
  return (
    <ColorShellIntl slug="gradient" lang="pt-br">
      <GradientTool lang="pt-br" />
    </ColorShellIntl>
  );
}
