import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'mask');

export default function HiTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="hi">
      <MaskTool lang="hi" />
    </TextShellIntl>
  );
}
