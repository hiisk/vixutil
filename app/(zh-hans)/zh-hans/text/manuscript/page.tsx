import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'manuscript');

export default function ZhHansTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="zh-hans">
      <ManuscriptTool lang="zh-hans" />
    </TextShellIntl>
  );
}
