import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('pt-br', 'slug');

export default function PtBrTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="pt-br">
      <SlugTool lang="pt-br" />
    </TextShellIntl>
  );
}
