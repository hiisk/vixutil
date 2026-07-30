import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('de', 'name');

export default function DeColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="de">
      <NameTool lang="de" />
    </ColorShellIntl>
  );
}
