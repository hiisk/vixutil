import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'replace');

export default function ZhHansTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="zh-hans">
      <ReplaceTool lang="zh-hans" />
    </TextShellIntl>
  );
}
