import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'mask');

export default function EnTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="en">
      <MaskTool lang="en" />
    </TextShellIntl>
  );
}
