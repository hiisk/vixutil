import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('en', 'slug');

export default function EnTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="en">
      <SlugTool lang="en" />
    </TextShellIntl>
  );
}
