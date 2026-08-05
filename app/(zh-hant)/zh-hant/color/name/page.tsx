import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('zh-hant', 'name');

export default function EnColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="zh-hant">
      <NameTool lang="zh-hant" />
    </ColorShellIntl>
  );
}
