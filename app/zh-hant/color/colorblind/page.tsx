import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hant', 'colorblind');

export default function EnColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="zh-hant">
      <ColorblindTool lang="zh-hant" />
    </ColorShellIntl>
  );
}
