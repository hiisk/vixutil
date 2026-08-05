import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hans', 'name');

export default function EnColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="zh-hans">
      <NameTool lang="zh-hans" />
    </ColorShellIntl>
  );
}
