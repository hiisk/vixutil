import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'random');

export default function PtBrColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="pt-br">
      <RandomTool lang="pt-br" />
    </ColorShellIntl>
  );
}
