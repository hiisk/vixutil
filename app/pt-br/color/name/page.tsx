import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { alternateLanguages } from '@/lib/locales';

export const metadata: Metadata = {
  title: 'Nome de cor — A cor com nome mais próxima de um HEX',
  description: 'Digite um código de cor e ele acha a cor com nome mais próxima — coral, verde-azulado, carmim — e mostra HEX, RGB, HSL e CMYK juntos. Para quando você precisa descrever uma cor em palavras.',
  alternates: {
    canonical: '/pt-br/color/name',
    languages: alternateLanguages('/color/name'),
  },
};

export default function PtBrColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="pt-br">
      <NameTool lang="pt-br" />
    </ColorShellIntl>
  );
}
