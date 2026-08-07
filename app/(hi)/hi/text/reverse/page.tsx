import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'reverse');

export default function HiTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="hi">
      <ReverseTool lang="hi" />
    </TextShellIntl>
  );
}
