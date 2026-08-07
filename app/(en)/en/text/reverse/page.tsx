import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'reverse');

export default function EnTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="en">
      <ReverseTool lang="en" />
    </TextShellIntl>
  );
}
