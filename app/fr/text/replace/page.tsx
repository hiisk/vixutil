import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReplaceTool from '@/components/text/ReplaceTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'replace');

export default function FrTextReplacePage() {
  return (
    <TextShellIntl slug="replace" lang="fr">
      <ReplaceTool lang="fr" />
    </TextShellIntl>
  );
}
