import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'wrap');

export default function ZhHantTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="zh-hant">
      <WrapTool lang="zh-hant" />
    </TextShellIntl>
  );
}
