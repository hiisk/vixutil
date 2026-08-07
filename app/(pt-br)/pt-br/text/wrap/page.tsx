import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'wrap');

export default function PtBrTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="pt-br">
      <WrapTool lang="pt-br" />
    </TextShellIntl>
  );
}
