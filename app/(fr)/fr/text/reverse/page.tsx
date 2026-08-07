import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import ReverseTool from '@/components/text/ReverseTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'reverse');

export default function FrTextReversePage() {
  return (
    <TextShellIntl slug="reverse" lang="fr">
      <ReverseTool lang="fr" />
    </TextShellIntl>
  );
}
