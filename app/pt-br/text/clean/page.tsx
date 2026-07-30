import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'clean');

export default function PtBrTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="pt-br">
      <CleanTool lang="pt-br" />
    </TextShellIntl>
  );
}
