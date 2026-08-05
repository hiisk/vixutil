import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'emoticon');

export default function EnTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="en">
      <EmoticonTool lang="en" />
    </TextShellIntl>
  );
}
