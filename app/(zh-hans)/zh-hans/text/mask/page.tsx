import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'mask');

export default function ZhHansTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="zh-hans">
      <MaskTool lang="zh-hans" />
    </TextShellIntl>
  );
}
