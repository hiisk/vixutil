import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import VerticalTool from '@/components/text/VerticalTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'vertical');

export default function JaTextVerticalPage() {
  return (
    <TextShellIntl slug="vertical" lang="ja">
      <VerticalTool lang="ja" />
    </TextShellIntl>
  );
}
