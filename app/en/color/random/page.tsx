import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('en', 'random');

export default function EnColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="en">
      <RandomTool lang="en" />
    </ColorShellIntl>
  );
}
