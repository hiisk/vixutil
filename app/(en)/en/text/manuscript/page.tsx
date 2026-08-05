import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'manuscript');

export default function EnTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="en">
      <ManuscriptTool lang="en" />
    </TextShellIntl>
  );
}
