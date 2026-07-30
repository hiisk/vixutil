import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('ja', 'special-char');

export default function JaTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="ja">
      <SpecialCharTool lang="ja" />
    </TextShellIntl>
  );
}
