import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'reverse');

export default function ZhHantTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="zh-hant">
      <ReverseTool lang="zh-hant" />
    </TextShellIntl>
  );
}
