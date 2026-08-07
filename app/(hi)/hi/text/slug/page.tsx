import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'slug');

export default function HiTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="hi">
      <SlugTool lang="hi" />
    </TextShellIntl>
  );
}
