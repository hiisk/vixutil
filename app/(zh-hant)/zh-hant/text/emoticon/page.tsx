import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'emoticon');

export default function ZhHantTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="zh-hant">
      <EmoticonTool lang="zh-hant" />
    </TextShellIntl>
  );
}
