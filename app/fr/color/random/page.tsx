import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'random');

export default function FrColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="fr">
      <RandomTool lang="fr" />
    </ColorShellIntl>
  );
}
