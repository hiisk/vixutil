import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import EmoticonTool from '@/components/text/EmoticonTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'emoticon');

export default function PtBrTextEmoticonPage() {
  return (
    <TextShellIntl slug="emoticon" lang="pt-br">
      <EmoticonTool lang="pt-br" />
    </TextShellIntl>
  );
}
