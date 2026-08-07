import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'table');

export default function EnTextTablePage() {
  return (
    <TextShellIntl slug="table" lang="en">
      <TableTool lang="en" />
    </TextShellIntl>
  );
}
