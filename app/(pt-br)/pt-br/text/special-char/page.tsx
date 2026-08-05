import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'special-char');

export default function PtBrTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="pt-br">
      <SpecialCharTool lang="pt-br" />
    </TextShellIntl>
  );
}
