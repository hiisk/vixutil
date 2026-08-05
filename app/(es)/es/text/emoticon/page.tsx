import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'emoticon');

export default function EsTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="es">
      <EmoticonTool lang="es" />
    </TextShellIntl>
  );
}
