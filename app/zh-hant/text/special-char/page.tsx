import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('zh-hant', 'special-char');

export default function ZhHantTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="zh-hant">
      <SpecialCharTool lang="zh-hant" />
    </TextShellIntl>
  );
}
