import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'colorblind');

export default function FrColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="fr">
      <ColorblindTool lang="fr" />
    </ColorShellIntl>
  );
}
