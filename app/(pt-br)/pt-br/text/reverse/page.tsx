import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'reverse');

export default function PtBrTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="pt-br">
      <ReverseTool lang="pt-br" />
    </TextShellIntl>
  );
}
