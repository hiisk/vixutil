import type { Metadata } from 'next';
import ColorShellIntl from '@/components/ColorShellIntl';
import NameTool from '@/components/color/NameTool';
import { colorMetaIntl } from '@/lib/color-tools-intl';

export const metadata: Metadata = colorMetaIntl('es', 'name');

export default function EsColorNamePage() {
  return (
    <ColorShellIntl slug="name" lang="es">
      <NameTool lang="es" />
    </ColorShellIntl>
  );
}
