import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('fr', 'name');

export default function FrColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="fr">
      <NameTool lang="fr" />
    </ColorShellIntl>
  );
}
