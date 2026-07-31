import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'clean');

export default function ZhHansTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="zh-hans">
      <CleanTool lang="zh-hans" />
    </TextShellIntl>
  );
}
