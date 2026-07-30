import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'shades');

export default function JaColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="ja">
      <ShadesTool lang="ja" />
    </ColorShellIntl>
  );
}
