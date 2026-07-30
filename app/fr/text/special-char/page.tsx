import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'special-char');

export default function FrTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="fr">
      <SpecialCharTool lang="fr" />
    </TextShellIntl>
  );
}
