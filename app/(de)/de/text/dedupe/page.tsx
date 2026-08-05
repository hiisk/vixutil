import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'dedupe');

export default function DeTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="de">
      <DedupeTool lang="de" />
    </TextShellIntl>
  );
}
