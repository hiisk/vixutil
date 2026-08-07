import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'table');

export default function ZhHansTextTablePage() {
  return (
    <TextShellIntl slug="table" lang="zh-hans">
      <TableTool lang="zh-hans" />
    </TextShellIntl>
  );
}
