import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'clean');

export default function JaTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="ja">
      <CleanTool lang="ja" />
    </TextShellIntl>
  );
}
