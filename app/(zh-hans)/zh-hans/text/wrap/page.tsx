import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'wrap');

export default function ZhHansTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="zh-hans">
      <WrapTool lang="zh-hans" />
    </TextShellIntl>
  );
}
