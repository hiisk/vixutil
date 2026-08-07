import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import MaskTool from '@/components/text/MaskTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'mask');

export default function FrTextMaskPage() {
  return (
    <TextShellIntl slug="mask" lang="fr">
      <MaskTool lang="fr" />
    </TextShellIntl>
  );
}
