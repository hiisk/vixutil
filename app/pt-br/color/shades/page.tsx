import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('pt-br', 'shades');

export default function PtBrColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="pt-br">
      <ShadesTool lang="pt-br" />
    </ColorShellIntl>
  );
}
