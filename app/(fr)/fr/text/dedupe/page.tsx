import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'dedupe');

export default function FrTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="fr">
      <DedupeTool lang="fr" />
    </TextShellIntl>
  );
}
