import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'replace');

export default function PtBrTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="pt-br">
      <ReplaceTool lang="pt-br" />
    </TextShellIntl>
  );
}
