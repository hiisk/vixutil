import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'shades');

export default function FrColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="fr">
      <ShadesTool lang="fr" />
    </ColorShellIntl>
  );
}
