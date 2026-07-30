import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'emoticon');

export default function DeTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="de">
      <EmoticonTool lang="de" />
    </TextShellIntl>
  );
}
