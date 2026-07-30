import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('ja', 'name');

export default function JaColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="ja">
      <NameTool lang="ja" />
    </ColorShellIntl>
  );
}
