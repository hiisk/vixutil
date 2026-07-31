import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'clean');

export default function ZhHantTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="zh-hant">
      <CleanTool lang="zh-hant" />
    </TextShellIntl>
  );
}
