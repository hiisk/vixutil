import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ManuscriptTool from '@/components/text/ManuscriptTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'manuscript');

export default function FrTextManuscriptPage() {
  return (
    <TextShellIntl slug="manuscript" lang="fr">
      <ManuscriptTool lang="fr" />
    </TextShellIntl>
  );
}
