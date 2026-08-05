import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ContrastTool from '@/components/color/ContrastTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'contrast');

export default function JaColorContrastPage() {
  return (
    <ColorShellIntl slug="contrast" lang="ja">
      <ContrastTool lang="ja" />
    </ColorShellIntl>
  );
}
