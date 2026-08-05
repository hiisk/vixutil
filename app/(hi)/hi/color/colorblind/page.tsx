import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'colorblind');

export default function HiColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="hi">
      <ColorblindTool lang="hi" />
    </ColorShellIntl>
  );
}
