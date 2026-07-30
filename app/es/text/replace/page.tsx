import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'replace');

export default function EsTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="es">
      <ReplaceTool lang="es" />
    </TextShellIntl>
  );
}
