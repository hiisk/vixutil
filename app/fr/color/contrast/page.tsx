import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'contrast');

export default function FrColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="fr">
      <ContrastTool lang="fr" />
    </ColorShellIntl>
  );
}
