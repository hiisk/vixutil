import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'mask');

export default function JaTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="ja">
      <MaskTool lang="ja" />
    </TextShellIntl>
  );
}
