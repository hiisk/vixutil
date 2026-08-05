import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import RandomTool from '@/components/color/RandomTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'random');

export default function DeColorRandomPage() {
  return (
    <ColorShellIntl slug="random" lang="de">
      <RandomTool lang="de" />
    </ColorShellIntl>
  );
}
