import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'lorem');

export default function PtBrTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="pt-br">
      <LoremTool lang="pt-br" />
    </TextShellIntl>
  );
}
