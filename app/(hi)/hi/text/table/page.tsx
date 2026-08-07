import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'table');

export default function HiTextTablePage() {
  return (
    <TextShellIntl slug="table" lang="hi">
      <TableTool lang="hi" />
    </TextShellIntl>
  );
}
