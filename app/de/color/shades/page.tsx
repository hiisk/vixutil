import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'shades');

export default function DeColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="de">
      <ShadesTool lang="de" />
    </ColorShellIntl>
  );
}
