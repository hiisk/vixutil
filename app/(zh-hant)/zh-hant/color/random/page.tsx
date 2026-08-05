import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hant', 'random');

export default function EnColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="zh-hant">
      <RandomTool lang="zh-hant" />
    </ColorShellIntl>
  );
}
