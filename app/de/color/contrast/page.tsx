import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'contrast');

export default function DeColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="de">
      <ContrastTool lang="de" />
    </ColorShellIntl>
  );
}
