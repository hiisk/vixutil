import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'reverse');

export default function DeTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="de">
      <ReverseTool lang="de" />
    </TextShellIntl>
  );
}
