import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'dedupe');

export default function HiTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="hi">
      <DedupeTool lang="hi" />
    </TextShellIntl>
  );
}
