import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'dedupe');

export default function JaTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="ja">
      <DedupeTool lang="ja" />
    </TextShellIntl>
  );
}
