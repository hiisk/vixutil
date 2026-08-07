import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SlugTool from '@/components/text/SlugTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'slug');

export default function ZhHantTextSlugPage() {
  return (
    <TextShellIntl slug="slug" lang="zh-hant">
      <SlugTool lang="zh-hant" />
    </TextShellIntl>
  );
}
