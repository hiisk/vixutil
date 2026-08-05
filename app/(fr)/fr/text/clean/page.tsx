import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import CleanTool from '@/components/text/CleanTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'clean');

export default function FrTextCleanPage() {
  return (
    <TextShellIntl slug="clean" lang="fr">
      <CleanTool lang="fr" />
    </TextShellIntl>
  );
}
