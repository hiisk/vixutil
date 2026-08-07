import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'table');

export default function PtBrTextTablePage() {
  return (
    <TextShellIntl slug="table" lang="pt-br">
      <TableTool lang="pt-br" />
    </TextShellIntl>
  );
}
