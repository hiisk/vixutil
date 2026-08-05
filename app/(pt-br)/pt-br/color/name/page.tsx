import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'name');

export default function PtBrColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="pt-br">
      <NameTool lang="pt-br" />
    </ColorShellIntl>
  );
}
