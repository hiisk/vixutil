import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('en', 'shades');

export default function EnColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="en">
      <ShadesTool lang="en" />
    </ColorShellIntl>
  );
}
