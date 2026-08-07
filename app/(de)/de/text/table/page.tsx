import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'table');

export default function DeTextTablePage() {
  return (
    <TextShellIntl slug="table" lang="de">
      <TableTool lang="de" />
    </TextShellIntl>
  );
}
