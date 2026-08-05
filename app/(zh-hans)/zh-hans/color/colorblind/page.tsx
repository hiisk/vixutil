import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import ColorblindTool from '@/components/color/ColorblindTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hans', 'colorblind');

export default function EnColorColorblindPage() {
  return (
    <ColorShellIntl slug="colorblind" lang="zh-hans">
      <ColorblindTool lang="zh-hans" />
    </ColorShellIntl>
  );
}
