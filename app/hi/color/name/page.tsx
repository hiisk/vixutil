import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('hi', 'name');

export default function HiColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="hi">
      <NameTool lang="hi" />
    </ColorShellIntl>
  );
}
