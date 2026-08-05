import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import DedupeTool from '@/components/text/DedupeTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'dedupe');

export default function PtBrTextDedupePage() {
  return (
    <TextShellIntl slug="dedupe" lang="pt-br">
      <DedupeTool lang="pt-br" />
    </TextShellIntl>
  );
}
