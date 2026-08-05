import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'emoticon');

export default function FrTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="fr">
      <EmoticonTool lang="fr" />
    </TextShellIntl>
  );
}
