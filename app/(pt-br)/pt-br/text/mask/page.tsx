import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'mask');

export default function PtBrTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="pt-br">
      <MaskTool lang="pt-br" />
    </TextShellIntl>
  );
}
