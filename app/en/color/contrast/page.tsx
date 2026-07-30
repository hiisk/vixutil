import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('en', 'contrast');

export default function EnColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="en">
      <ContrastTool lang="en" />
    </ColorShellIntl>
  );
}
