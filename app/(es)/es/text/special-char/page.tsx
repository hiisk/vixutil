import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'special-char');

export default function EsTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="es">
      <SpecialCharTool lang="es" />
    </TextShellIntl>
  );
}
