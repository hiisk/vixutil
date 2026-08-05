import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'lorem');

export default function ZhHansTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="zh-hans">
      <LoremTool lang="zh-hans" />
    </TextShellIntl>
  );
}
