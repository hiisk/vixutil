import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'wrap');

export default function FrTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="fr">
      <WrapTool lang="fr" />
    </TextShellIntl>
  );
}
