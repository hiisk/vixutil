import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'vertical');

export default function DeTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="de">
      <VerticalTool lang="de" />
    </TextShellIntl>
  );
}
