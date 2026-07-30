import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Verificador de contraste de cor — Razão WCAG AA e AAA',
  description: 'Calcula a razão de contraste entre o fundo e o texto e diz se passa dos limites de acessibilidade web (WCAG AA e AAA), com prévia de texto real para julgar também no olho.',
  alternates: {
    canonical: '/pt-br/color/contrast',
    languages: alternateLanguages('/color/contrast'),
  },
};

export default function PtBrColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="pt-br">
      <ContrastTool lang="pt-br" />
    </ColorShellIntl>
  );
}
