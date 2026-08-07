import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'vertical');

export default function ZhHansTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="zh-hans">
      <VerticalTool lang="zh-hans" />
    </TextShellIntl>
  );
}
