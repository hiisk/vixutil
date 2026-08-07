import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'reverse');

export default function JaTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="ja">
      <ReverseTool lang="ja" />
    </TextShellIntl>
  );
}
