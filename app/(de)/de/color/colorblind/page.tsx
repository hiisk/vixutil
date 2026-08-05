import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'colorblind');

export default function DeColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="de">
      <ColorblindTool lang="de" />
    </ColorShellIntl>
  );
}
