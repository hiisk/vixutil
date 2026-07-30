import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'manuscript');

export default function PtBrTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="pt-br">
      <ManuscriptTool lang="pt-br" />
    </TextShellIntl>
  );
}
