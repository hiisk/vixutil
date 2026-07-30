import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import LoremTool from '@/components/text/LoremTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'lorem');

export default function JaTextLoremPage() {
  return (
    <TextShellIntl slug="lorem" lang="ja">
      <LoremTool lang="ja" />
    </TextShellIntl>
  );
}
