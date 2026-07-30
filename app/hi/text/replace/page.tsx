import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'replace');

export default function HiTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="hi">
      <ReplaceTool lang="hi" />
    </TextShellIntl>
  );
}
