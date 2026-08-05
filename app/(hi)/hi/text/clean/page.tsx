import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'clean');

export default function HiTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="hi">
      <CleanTool lang="hi" />
    </TextShellIntl>
  );
}
