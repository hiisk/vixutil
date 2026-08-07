import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import WrapTool from '@/components/text/WrapTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'wrap');

export default function JaTextWrapPage() {
  return (
    <TextShellIntl slug="wrap" lang="ja">
      <WrapTool lang="ja" />
    </TextShellIntl>
  );
}
