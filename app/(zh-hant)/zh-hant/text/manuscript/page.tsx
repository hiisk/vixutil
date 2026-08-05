import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'manuscript');

export default function ZhHantTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="zh-hant">
      <ManuscriptTool lang="zh-hant" />
    </TextShellIntl>
  );
}
