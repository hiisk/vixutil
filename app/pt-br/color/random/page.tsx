import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Gerador de cores aleatórias — Sorteie de novo com travas',
  description: 'Gera cinco cores aleatórias. Trave as que você gostar e sorteie só o resto, para percorrer combinações rápido até alguma funcionar.',
  alternates: {
    canonical: '/pt-br/color/random',
    languages: alternateLanguages('/color/random'),
  },
};

export default function PtBrColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="pt-br">
      <RandomTool lang="pt-br" />
    </ColorShellIntl>
  );
}
