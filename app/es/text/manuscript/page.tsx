import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'manuscript');

export default function EsTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="es">
      <ManuscriptTool lang="es" />
    </TextShellIntl>
  );
}
