import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'mask');

export default function ZhHantTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="zh-hant">
      <MaskTool lang="zh-hant" />
    </TextShellIntl>
  );
}
