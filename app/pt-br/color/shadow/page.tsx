import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadowTool from '@/components/color/ShadowTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Gerador de box-shadow CSS — Prévia ao vivo e código',
  description: 'Ajuste deslocamento, desfoque, espalhamento, cor e opacidade vendo o resultado, e leve o CSS. Inclui presets que empilham várias sombras para uma sensação de profundidade mais natural.',
  alternates: {
    canonical: '/pt-br/color/shadow',
    languages: alternateLanguages('/color/shadow'),
  },
};

export default function PtBrColorShadowPage() {
  return (
    <ColorShellIntl slug="shadow" lang="pt-br">
      <ShadowTool lang="pt-br" />
    </ColorShellIntl>
  );
}
