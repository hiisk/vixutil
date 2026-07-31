import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'replace');

export default function ZhHantTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="zh-hant">
      <ReplaceTool lang="zh-hant" />
    </TextShellIntl>
  );
}
