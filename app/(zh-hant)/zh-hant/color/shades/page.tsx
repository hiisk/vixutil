import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ShadesTool from '@/components/color/ShadesTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hant', 'shades');

export default function EnColorShadesPage() {
  return (
    <ColorShellIntl slug="shades" lang="zh-hant">
      <ShadesTool lang="zh-hant" />
    </ColorShellIntl>
  );
}
