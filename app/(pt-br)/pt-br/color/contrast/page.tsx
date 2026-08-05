import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'contrast');

export default function PtBrColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="pt-br">
      <ContrastTool lang="pt-br" />
    </ColorShellIntl>
  );
}
