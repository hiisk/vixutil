import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hans', 'special-char');

export default function ZhHansTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="zh-hans">
      <SpecialCharTool lang="zh-hans" />
    </TextShellIntl>
  );
}
