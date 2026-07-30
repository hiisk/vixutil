import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('en', 'name');

export default function EnColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="en">
      <NameTool lang="en" />
    </ColorShellIntl>
  );
}
