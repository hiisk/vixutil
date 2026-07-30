import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'case');

export default function DeTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="de">
      <CaseTool lang="de" />
    </TextShellIntl>
  );
}
