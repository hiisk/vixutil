import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'emoticon');

export default function JaTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="ja">
      <EmoticonTool lang="ja" />
    </TextShellIntl>
  );
}
