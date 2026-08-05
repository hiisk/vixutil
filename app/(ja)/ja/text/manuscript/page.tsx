import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'manuscript');

export default function JaTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="ja">
      <ManuscriptTool lang="ja" />
    </TextShellIntl>
  );
}
