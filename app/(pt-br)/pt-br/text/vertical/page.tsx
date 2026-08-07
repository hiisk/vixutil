import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'vertical');

export default function PtBrTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="pt-br">
      <VerticalTool lang="pt-br" />
    </TextShellIntl>
  );
}
