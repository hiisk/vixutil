import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CaseTool from '@/components/text/CaseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'case');

export default function FrTextCasePage() {
  return (
    <TextShellIntl slug="case" lang="fr">
      <CaseTool lang="fr" />
    </TextShellIntl>
  );
}
