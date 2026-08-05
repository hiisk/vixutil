import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'clean');

export default function DeTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="de">
      <CleanTool lang="de" />
    </TextShellIntl>
  );
}
