import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'slug');

export default function JaTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="ja">
      <SlugTool lang="ja" />
    </TextShellIntl>
  );
}
