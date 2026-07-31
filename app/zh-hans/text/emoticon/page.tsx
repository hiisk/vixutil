import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'emoticon');

export default function ZhHansTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="zh-hans">
      <EmoticonTool lang="zh-hans" />
    </TextShellIntl>
  );
}
