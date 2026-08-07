import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import TableTool from '@/components/text/TableTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'table');

export default function ZhHantTextTablePage() {
  return (
    <TextShellIntl slug="table" lang="zh-hant">
      <TableTool lang="zh-hant" />
    </TextShellIntl>
  );
}
