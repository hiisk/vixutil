import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'contrast');

export default function HiColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="hi">
      <ContrastTool lang="hi" />
    </ColorShellIntl>
  );
}
