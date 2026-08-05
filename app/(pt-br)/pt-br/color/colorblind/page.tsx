import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'colorblind');

export default function PtBrColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="pt-br">
      <ColorblindTool lang="pt-br" />
    </ColorShellIntl>
  );
}
