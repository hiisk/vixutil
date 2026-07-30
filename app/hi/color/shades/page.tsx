import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'shades');

export default function HiColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="hi">
      <ShadesTool lang="hi" />
    </ColorShellIntl>
  );
}
