import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'replace');

export default function DeTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="de">
      <ReplaceTool lang="de" />
    </TextShellIntl>
  );
}
