import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'table');

export default function JaTextTablePage() {
  return (
    <TextShellIntl slug="table" lang="ja">
      <TableTool lang="ja" />
    </TextShellIntl>
  );
}
