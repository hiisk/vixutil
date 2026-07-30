import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'case');

export default function EsTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="es">
      <CaseTool lang="es" />
    </TextShellIntl>
  );
}
