import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'case');

export default function EnTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="en">
      <CaseTool lang="en" />
    </TextShellIntl>
  );
}
