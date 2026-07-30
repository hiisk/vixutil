import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import PaletteTool from '@/components/color/PaletteTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Gerador de paletas de cores — Monte combinações que funcionam',
  description: 'Escolha uma cor e ele deduz as que combinam com ela pelas regras do círculo cromático: complementares, análogas, tríade. Escolher por regra em vez de no olho evita que a combinação saia errada.',
  alternates: {
    canonical: '/pt-br/color/palette',
    languages: alternateLanguages('/color/palette'),
  },
};

export default function PtBrColorPalettePage() {
  return (
    <ColorShellIntl slug="palette" lang="pt-br">
      <PaletteTool lang="pt-br" />
    </ColorShellIntl>
  );
}
