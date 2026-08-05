import type { Metadata } from 'next';
import TextShellIntl from '@/components/TextShellIntl';
import SpecialCharTool from '@/components/text/SpecialCharTool';
import { textMetaIntl } from '@/lib/text-tools-intl';

export const metadata: Metadata = textMetaIntl('hi', 'special-char');

export default function HiTextSpecialCharPage() {
  return (
    <TextShellIntl slug="special-char" lang="hi">
      <SpecialCharTool lang="hi" />
    </TextShellIntl>
  );
}
