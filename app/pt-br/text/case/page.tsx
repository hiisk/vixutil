import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'case');

export default function PtBrTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="pt-br">
      <CaseTool lang="pt-br" />
    </TextShellIntl>
  );
}
