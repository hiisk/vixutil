import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'replace');

export default function JaTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="ja">
      <ReplaceTool lang="ja" />
    </TextShellIntl>
  );
}
