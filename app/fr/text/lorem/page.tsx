import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'lorem');

export default function FrTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="fr">
      <LoremTool lang="fr" />
    </TextShellIntl>
  );
}
