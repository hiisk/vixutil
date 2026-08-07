import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'vertical');

export default function ZhHantTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="zh-hant">
      <VerticalTool lang="zh-hant" />
    </TextShellIntl>
  );
}
