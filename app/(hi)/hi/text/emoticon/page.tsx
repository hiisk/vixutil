import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'emoticon');

export default function HiTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="hi">
      <EmoticonTool lang="hi" />
    </TextShellIntl>
  );
}
