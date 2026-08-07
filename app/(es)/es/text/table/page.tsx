import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('es', 'table');

export default function EsTextTablePage() {
  return (
    <TextShellIntl slug="table" lang="es">
      <TableTool lang="es" />
    </TextShellIntl>
  );
}
