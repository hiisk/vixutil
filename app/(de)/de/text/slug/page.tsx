import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('de', 'slug');

export default function DeTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="de">
      <SlugTool lang="de" />
    </TextShellIntl>
  );
}
