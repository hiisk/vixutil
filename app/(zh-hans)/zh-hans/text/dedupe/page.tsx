import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'dedupe');

export default function ZhHansTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="zh-hans">
      <DedupeTool lang="zh-hans" />
    </TextShellIntl>
  );
}
