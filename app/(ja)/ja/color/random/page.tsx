import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'random');

export default function JaColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="ja">
      <RandomTool lang="ja" />
    </ColorShellIntl>
  );
}
