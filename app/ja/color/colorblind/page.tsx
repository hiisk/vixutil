import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'colorblind');

export default function JaColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="ja">
      <ColorblindTool lang="ja" />
    </ColorShellIntl>
  );
}
