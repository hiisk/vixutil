import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'replace');

export default function EnTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="en">
      <ReplaceTool lang="en" />
    </TextShellIntl>
  );
}
