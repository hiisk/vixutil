import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'vertical');

export default function FrTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="fr">
      <VerticalTool lang="fr" />
    </TextShellIntl>
  );
}
