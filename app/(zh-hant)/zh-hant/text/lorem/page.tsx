import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'lorem');

export default function ZhHantTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="zh-hant">
      <LoremTool lang="zh-hant" />
    </TextShellIntl>
  );
}
