import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'slug');

export default function ZhHansTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="zh-hans">
      <SlugTool lang="zh-hans" />
    </TextShellIntl>
  );
}
