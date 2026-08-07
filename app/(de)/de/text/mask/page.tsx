import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'mask');

export default function DeTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="de">
      <MaskTool lang="de" />
    </TextShellIntl>
  );
}
