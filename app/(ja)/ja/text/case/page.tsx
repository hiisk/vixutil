import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'case');

export default function JaTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="ja">
      <CaseTool lang="ja" />
    </TextShellIntl>
  );
}
