import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'clean');

export default function EnTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="en">
      <CleanTool lang="en" />
    </TextShellIntl>
  );
}
