import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'reverse');

export default function ZhHansTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="zh-hans">
      <ReverseTool lang="zh-hans" />
    </TextShellIntl>
  );
}
