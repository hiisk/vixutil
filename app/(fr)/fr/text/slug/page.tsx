import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('fr', 'slug');

export default function FrTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="fr">
      <SlugTool lang="fr" />
    </TextShellIntl>
  );
}
