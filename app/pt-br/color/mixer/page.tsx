import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import MixerTool from '@/components/color/MixerTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Misturador de cores — Misture duas cores e ache o meio',
  description: 'Defina duas cores e mova a proporção para obter o que fica entre elas. Útil para tirar a cor de um ponto específico de um gradiente, ou achar um tom intermediário entre duas cores de marca.',
  alternates: {
    canonical: '/pt-br/color/mixer',
    languages: alternateLanguages('/color/mixer'),
  },
};

export default function PtBrColorMixerPage() {
  return (
    <ColorShellIntl slug="mixer" lang="pt-br">
      <MixerTool lang="pt-br" />
    </ColorShellIntl>
  );
}
